import {
    Inject,
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { examType } from '../enums/exam-type.enum';
import { Types } from 'mongoose';

const CACHE_TTL = 3600; // 1 hour

@Injectable()
export class FetchExamAssignmentsProvider {
    constructor(
        @InjectModel(ExamAssignment.name)
        private readonly examAssignmentModel: Model<ExamAssignmentDocument>,

        @InjectModel(Exam.name)
        private readonly examModel: Model<Exam>,

        @InjectModel('McqQuestion')
        private readonly mcqModel: Model<any>,

        @InjectModel('OeQuestion')
        private readonly oeModel: Model<any>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
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
                const exam = assignment.exam as unknown as ExamDocument;

                if (!exam || !exam.questions?.length) return null;

                const examId = exam._id.toString();
                await this.generateAndCacheQuestions(studentId, exam);

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
     * Generate and cache a list of randomized question IDs for a student-exam combo
     */
    async generateAndCacheQuestions(studentId: string, exam: ExamDocument): Promise<string[]> {
        const examId = exam._id.toString();
        const cacheKey = `exam-questions:${studentId}:${examId}`;

        // Return cached question IDs if available
        const cached = await this.cacheManager.get<string[]>(cacheKey);
        if (cached) return cached;

        const questions = exam.questions;
        if (!questions?.length) {
            throw new Error(`No questions available for exam ${examId}`);
        }

        if (exam.questionCount > questions.length) {
            throw new Error(`Exam ${examId} requests ${exam.questionCount} questions but only ${questions.length} are available`);
        }

        const selected = this.shuffleAndSelect(questions, exam.questionCount);
        const questionIds = selected.map((q) => q.toString());

        // Cache the selected question IDs
        await this.cacheManager.set(cacheKey, questionIds, CACHE_TTL);

        // Load full question objects and cache each individually
        const model = this.getQuestionModel(exam.examType);
        const fullQuestions = await model.find({ _id: { $in: selected } }).lean().exec();

        await Promise.all(
            fullQuestions.map(async (question) => {
                const qid = question._id.toString();
                const key = `question:${qid}`;
                const exists = await this.cacheManager.get(key);
                if (!exists) {
                    await this.cacheManager.set(key, question, CACHE_TTL);
                }
            }),
        );

        return questionIds;
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
