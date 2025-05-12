import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-mcq-exam.dto';
import { CreateExamProvider } from './create-exam.provider';
import { UpdateMcqExamProvider } from './update-mcq-exam.provider';
import { Model } from 'mongoose';
import { McqExam, McqExamDocument } from '../schemas/mcq-exam.schema';
import { InjectModel } from '@nestjs/mongoose';
import { successResponse } from 'src/utils/response-writer';
import { McqQuestion } from '../schemas/mcq-question.schema';

@Injectable()
export class ExamService {
  constructor(
    private readonly createExamProvider: CreateExamProvider,
    private readonly updateMcqExamProvider: UpdateMcqExamProvider,

    @InjectModel(McqExam.name)
    private readonly mcqExamModel: Model<McqExamDocument>,

    @InjectModel(McqQuestion.name)
    private readonly mcqQuestionModel: Model<McqQuestion>
  ) {}

  public async createExam(
    createExamDto: CreateExamDto,
    tutorialList: Express.Multer.File,
  ) {
    if (
      !tutorialList ||
      tutorialList.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException('Only .xlsx files are allowed');
    }

    return this.createExamProvider.createExam(createExamDto, tutorialList)
  }

  public async updateMcqExam(examId: string, mcqTemplate: Express.Multer.File) {
    if (
      !mcqTemplate ||
      mcqTemplate.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException('Only .xlsx files are allowed');
    }

    return this.updateMcqExamProvider.updateMcqExam(examId, mcqTemplate)
  }

  public async deleteMcqExam(examId: string) {
  const exam = await this.mcqExamModel.findById(examId);

  if (!exam) {
    throw new NotFoundException('Exam not found');
  }

  if (exam.questions?.length) {
    await this.mcqQuestionModel.deleteMany({ _id: { $in: exam.questions } });
  }

  await this.mcqExamModel.findByIdAndDelete(examId);

  return { success: true, message: 'Exam and related questions deleted' };
}

  public async updateOeExam(examId: string, templates: Express.Multer.File[]) {
    // Add Exam questions
    // Setup AI grading model
    // Assign the exam to the students
  }
}
