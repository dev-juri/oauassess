import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';
import { ExamDocument } from '../schemas/exam.schema';
import { examType } from '../enums/exam-type.enum';
import { Types } from 'mongoose';
import { CacheService } from 'src/cache/cache.service';

/**
 * Cache for just 1hour
 */
const CACHE_TTL = 3600;

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

    /**
     * Get all exam assignments for a given student and include cached/randomized questions.
     */
    async getAssignmentsForStudent(studentId: string) {
        const assignments = await this.examAssignmentModel
            .find({ student: new Types.ObjectId(studentId) })
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
                    examId,
                    courseName: exam.courseName,
                    courseCode: exam.courseCode,
                    duration: exam.duration,
                    examType: exam.examType
                };
            }),
        );

        return results.filter(Boolean); // Remove nulls
    }


    /**
     * Generate and cache a list of randomized questions for a student-exam combo
     */
    async generateAndCacheQuestions(
        studentId: string,
        exam: ExamDocument
    ): Promise<CachedQuestion[]> {
        const examId = exam._id.toString();
        const cacheKey = `exam-questions:${studentId}:${examId}`;

        try {
            const cached = await this.cacheService.get<CachedQuestion[]>(cacheKey);
            if (cached) {
                console.log(`Cache hit for key: ${cacheKey}, returning ${cached.length} questions`);
                return cached;
            }

            // Validate exam questions
            const questions = exam.questions;
            if (!questions?.length) {
                throw new Error(`No questions available for exam ${examId}`);
            }

            if (exam.questionCount > questions.length) {
                throw new Error(`Exam ${examId} requests ${exam.questionCount} questions but only ${questions.length} are available`);
            }

            // Select random questions
            const selected = this.shuffleAndSelect(questions, exam.questionCount);
            console.log(`Selected ${selected.length} questions for exam ${examId}`);

            // Get the appropriate model based on exam type
            const model = this.getQuestionModel(exam.examType);

            // Bulk fetch all questions in a single query
            const fullQuestions = await model
                .find({ _id: { $in: selected } })
                .lean()
                .exec();

            console.log(`Fetched ${fullQuestions.length} questions from database`);

            // Process questions based on exam type
            let processedQuestions: CachedQuestion[];

            if (exam.examType === 'OeQuestion') {
                // For Open-Ended questions, only cache id and question
                processedQuestions = fullQuestions.map(q => ({
                    id: q._id.toString(),
                    question: q.question
                }));
                console.log(`Processed ${processedQuestions.length} OE questions`);
            } else {
                // For MCQ questions, cache id, question, and options
                processedQuestions = fullQuestions.map(q => ({
                    id: q._id.toString(),
                    question: q.question,
                    options: q.options
                }));
                console.log(`Processed ${processedQuestions.length} MCQ questions`);
            }

            await this.cacheService.set<CachedQuestion[]>(cacheKey, processedQuestions, CACHE_TTL);

            return processedQuestions;

        } catch (error) {
            throw new InternalServerErrorException("Error fetching questions for exam");
        }
    }

    /**
     * Shuffle an array and return `count` number of items
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
