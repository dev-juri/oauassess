import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';
import { ExamDocument } from '../schemas/exam.schema';
import { examType } from '../enums/exam-type.enum';
import { Types } from 'mongoose';
import { CacheService } from 'src/cache/cache.service';
import { McqQuestion, McqQuestionDocument } from '../schemas/mcq/mcq-question.schema';
import { generateExamQuestionsCacheKey, generateMcqQuestionCacheKey } from '../constants/cache-keys';

/**
 * Cache for just 1 day
 */
const CACHE_TTL = 1000 * 60 * 60 * 24;

/**
 * Provider class to generate and/or fetch assignment for each student
 */
@Injectable()
export class FetchExamAssignmentsProvider {
    constructor(
        @InjectModel(ExamAssignment.name)
        private readonly examAssignmentModel: Model<ExamAssignmentDocument>,

        @InjectModel('McqQuestion')
        private readonly mcqModel: Model<any>,

        @InjectModel('OeQuestion')
        private readonly oeModel: Model<any>,

        private readonly cacheService: CacheService,
    ) { }

    async updateStudentMcqScore(examId: string, studentId: string, score: number) {
        const assignment = await this.examAssignmentModel.findOne({ exam: examId, student: studentId });

        if (!assignment) {
            throw new NotFoundException("Assignment not found for student.");
        }

        if (assignment.score !== undefined && assignment.score !== null) {
            throw new ForbiddenException("Exam has already been graded.");
        }

        await this.examAssignmentModel.updateOne(
            { _id: assignment._id },
            {
                score: score,
                isCompleted: true
            },
            { runValidators: true }
        );
    }

    /**
     * Get all exam assignments for a given student and include cached/randomized questions.
     */
    async getAssignmentsForStudent(studentId: string) {
        const assignments = await this.examAssignmentModel
            .find({ student: new Types.ObjectId(studentId), isCompleted: false })
            .populate({
                path: 'exam',
                select: 'courseName courseCode duration examType questionCount questions',
            })
            .lean()
            .exec();

        if (!assignments.length) {
            throw new NotFoundException(`No exam assignments found for student ${studentId}`);
        }

        const results = await Promise.all(
            assignments.map(async (assignment) => {
                const exam = assignment.exam as ExamDocument;

                if (!exam || !exam.questions?.length) return null;

                const examId = exam._id.toString();

                return {
                    assignmentId: assignment._id,
                    examId,
                    courseName: exam.courseName,
                    courseCode: exam.courseCode,
                    duration: exam.duration,
                    examType: exam.examType
                };
            }),
        );

        return results.filter(Boolean);
    }


    /**
     * Generate and cache a list of randomized questions for a student-exam combo
     */
    async generateAndCacheQuestions(
        studentId: string,
        exam: ExamDocument
    ): Promise<CachedQuestion[]> {
        const examId = exam._id.toString();
        const cacheKey = generateExamQuestionsCacheKey(studentId, examId);

        try {
            // Check if questions are already cached
            const cached = await this.cacheService.get<CachedQuestion[]>(cacheKey);
            if (cached) {
                return cached;
            }

            // Validate exam questions
            const questions = exam.questions;
            if (!questions?.length) {
                throw new Error(`No questions available for exam ${examId}`);
            }

            if (exam.questionCount > questions.length) {
                throw new Error(
                    `Exam ${examId} requests ${exam.questionCount} questions but only ${questions.length} are available`
                );
            }

            // Select random questions
            const selected = this.shuffleAndSelect(questions, exam.questionCount);

            // Get the appropriate model based on exam type
            const model = this.getQuestionModel(exam.examType);

            // Bulk fetch all questions in a single query
            const fullQuestions = await model
                .find({ _id: { $in: selected } })
                .lean()
                .exec();

            // Validate that we got the expected number of questions
            if (fullQuestions.length !== selected.length) {
                throw new Error(
                    `Expected ${selected.length} questions but found ${fullQuestions.length} for exam ${examId}`
                );
            }

            // Process questions based on exam type
            let processedQuestions: CachedQuestion[];

            if (exam.examType === 'OeQuestion') {
                // For Open-Ended questions, only id and question
                processedQuestions = fullQuestions.map(q => ({
                    id: q._id.toString(),
                    question: q.question
                }));
            } else {
                // For MCQ questions, id, question, and options
                processedQuestions = fullQuestions.map(q => ({
                    id: q._id.toString(),
                    question: q.question,
                    options: q.options
                }));

                // Cache individual MCQ questions
                await this.cacheMcqQuestions(fullQuestions, CACHE_TTL);
            }

            // Cache the processed questions for this student-exam combination
            await this.cacheService.set<CachedQuestion[]>(cacheKey, processedQuestions, CACHE_TTL);

            return processedQuestions;

        } catch (error) {
            console.error('Error in generateAndCacheQuestions:', error);
            throw new InternalServerErrorException(
                `Error fetching questions for exam ${examId}: ${error.message}`
            );
        }
    }

    /**
     * Cache individual MCQ questions for faster retrieval
     * @param questions - Array of question objects (lean or full documents)
     * @param ttl - Time to live in seconds (optional)
     */
    async cacheMcqQuestions<T extends { _id: any }>(
        questions: T[],
        ttl?: number
    ): Promise<void> {
        try {
            const cacheItems = questions.map(question => {
                if (!question._id) {
                    throw new Error('Question missing _id field');
                }

                return {
                    key: generateMcqQuestionCacheKey(question._id.toString()),
                    value: question,
                    ttl
                };
            });

            await this.cacheService.mset(cacheItems);
        } catch (error) {
            throw new Error(`Failed to cache individual MCQ questions: ${error.message}`);
        }
    }

    /**
     * Retrieve a single MCQ question from cache
     * @param questionId - The ID of the question to retrieve
     * @returns The cached question or null if not found
     */
    async getCachedMcqQuestion<T = any>(questionId: string): Promise<T | null> {
        try {
            const cacheKey = generateMcqQuestionCacheKey(questionId);

            const cacheQuestion = await this.cacheService.get<T>(cacheKey);

            return cacheQuestion
        } catch (error) {
            console.error(`Error retrieving cached MCQ question ${questionId}:`, error);
            return null;
        }
    }

    /**
     * Shuffle the array and return `count` number of items
     */
    private shuffleAndSelect<T>(array: T[], count: number): T[] {
        const copy = [...array];
        for (let i = 0; i < count; i++) {
            const j = i + Math.floor(Math.random() * (copy.length - i));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy.slice(0, count);
    }

    /**
     * Get Mongoose model based on examType enum
     */
    private getQuestionModel(type: examType): Model<any> {
        switch (type) {
            case examType.MCQ:
                return this.mcqModel;
            case examType.OE:
                return this.oeModel;
            default:
                throw new InternalServerErrorException(`Unknown exam type: ${type}`);
        }
    }
}
