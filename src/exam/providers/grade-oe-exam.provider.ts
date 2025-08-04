import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { OeExamGrading, OeExamGradingDocument } from '../schemas/oe-exam-grading.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SubmitOeExamDto } from '../../student/dtos/submit-oe-exam.dto';
import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';

@Injectable()
export class GradeOeExamProvider {

    constructor(
        @InjectModel(OeExamGrading.name)
        private readonly oeExamGradingModel: Model<OeExamGradingDocument>,

        @InjectModel(ExamAssignment.name)
        private readonly examAssignmentModel: Model<ExamAssignmentDocument>,
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

    async gradeResponses() { }
}
