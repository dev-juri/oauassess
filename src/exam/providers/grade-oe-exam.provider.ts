import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { OeExamGrading, OeExamGradingDocument } from '../schemas/oe-exam-grading.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SubmitOeExamDto } from '../../student/dtos/submit-oe-exam.dto';
import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';
import { OpenaiService } from 'src/openai/openai.service';
import { OeQuestion, OeQuestionDocument } from '../schemas/oe/oe-question.schema';

@Injectable()
export class GradeOeExamProvider {

    constructor(
        @InjectModel(OeExamGrading.name)
        private readonly oeExamGradingModel: Model<OeExamGradingDocument>,

        @InjectModel(ExamAssignment.name)
        private readonly examAssignmentModel: Model<ExamAssignmentDocument>,

        @InjectModel(OeQuestion.name)
        private readonly oeQuestionModel: Model<OeQuestionDocument>,

        private readonly openAIService: OpenaiService
    ) { }

    async submitResponses(submitOeExamDto: SubmitOeExamDto): Promise<void> {
        const { examId, studentId, responses } = submitOeExamDto;

        const assignment = await this.examAssignmentModel.findOne({ exam: examId, student: studentId });
        if (!assignment) {
            throw new NotFoundException('Exam assignment not found.');
        }

        if (assignment.isCompleted) {
            throw new Error('Student has already completed this exam.');
        }

        await this.oeExamGradingModel.create({
            assignment: assignment._id,
            responses: responses.map((res) => ({
                questionId: res.questionId,
                userResponse: res.answer,
                aiComment: null,
                aiScore: null,
            })),
        });

        assignment.isCompleted = true;
        await assignment.save();
    }

    async prepareResponsesForGrading(examId: string): Promise<GradingRequest[]> {
        const completedAssignments = await this.examAssignmentModel
            .find({
                exam: new Types.ObjectId(examId),
                isCompleted: true,
            })
            .select('_id')
            .lean();

        if (completedAssignments.length === 0) {
            return [];
        }

        const assignmentIds = completedAssignments.map(a => a._id);

        const oeRecord = await this.oeExamGradingModel.aggregate([
            { $match: { assignment: { $in: assignmentIds } } },
            { $unwind: { path: '$responses', includeArrayIndex: 'responseIndex' } },
            {
                $group: {
                    _id: '$_id',
                    assignment: { $first: '$assignment' },
                    responses: { $push: '$responses' }
                }
            }
        ]);

        const gradingRequests: GradingRequest[] = [];

        oeRecord.forEach(oe => {
            oe.responses.forEach(response => {
                if (response.userResponse && response.userResponse.trim()) {
                    gradingRequests.push({
                        oeExamId: oe._id.toString(),
                        assignmentId: oe.assignment.toString(),
                        questionId: response.questionId.toString(),
                        responseId: response._id.toString(),
                        userResponse: response.userResponse,
                    });
                }
            });
        });

        const uniqueQuestionIds = [...new Set(gradingRequests.map(req => req.questionId))];

        const questionPromises = uniqueQuestionIds.map(questionId =>
            this.oeQuestionModel.findById(questionId).select('question').lean({ virtuals: true })
        );

        const questions = await Promise.all(questionPromises);

        const questionMap = new Map();
        questions.forEach((question, index) => {
            if (question) {
                questionMap.set(uniqueQuestionIds[index], question.question);
            }
        });

        gradingRequests.forEach(request => {
            request.questionText = questionMap.get(request.questionId) || undefined;
        });

        return gradingRequests;
    }
}
