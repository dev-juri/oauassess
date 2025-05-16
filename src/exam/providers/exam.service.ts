import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-mcq-exam.dto';
import { CreateExamProvider } from './create-exam.provider';
import { UpdateMcqExamProvider } from './update-mcq-exam.provider';
import { Model } from 'mongoose';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { InjectModel } from '@nestjs/mongoose';
import { successResponse } from 'src/utils/response-writer';
import { McqQuestion } from '../schemas/mcq/mcq-question.schema';
import { UpdateOeExamProvider } from './update-oe-exam.provider';

@Injectable()
export class ExamService {
  constructor(
    private readonly createExamProvider: CreateExamProvider,
    private readonly updateMcqExamProvider: UpdateMcqExamProvider,
    private readonly updateOeExamProvider: UpdateOeExamProvider,

    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,

    @InjectModel(McqQuestion.name)
    private readonly mcqQuestionModel: Model<McqQuestion>,
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

    return this.createExamProvider.createExam(createExamDto, tutorialList);
  }

  public async updateMcqExam(examId: string, mcqTemplate: Express.Multer.File) {
    if (
      !mcqTemplate ||
      mcqTemplate.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException('Only .xlsx files are allowed');
    }

    return this.updateMcqExamProvider.updateMcqExam(examId, mcqTemplate);
  }

  public async deleteMcqExam(examId: string) {
    const exam = await this.examModel.findById(examId);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.questions?.length) {
      await this.mcqQuestionModel.deleteMany({ _id: { $in: exam.questions } });
    }

    await this.examModel.findByIdAndDelete(examId);

    return successResponse({ message: 'Exam and related questions deleted' });
  }

  public async updateOeExam(examId: string, templates: Express.Multer.File[]) {
    let mGuide: Express.Multer.File;
    let oeTemplate: Express.Multer.File;

    if (!templates) {
      throw new BadRequestException(
        'You need to provide the templates to update exam',
      );
    }

    for (const template of templates) {
      if (
        template.mimetype ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        template.mimetype === 'application/pdf'
      ) {
        mGuide = template;
      } else if (
        template.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        oeTemplate = template;
      }
    }

    if (!mGuide) {
      throw new BadRequestException(
        'Please provide the marking guide in .docx or .pdf format',
      );
    }

    if (!oeTemplate) {
      throw new BadRequestException(
        'Please provide the questions in .xlsx format',
      );
    }

    return this.updateOeExamProvider.updateOeExam(examId, mGuide, oeTemplate);
  }
}
