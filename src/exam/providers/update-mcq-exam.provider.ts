import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  IMcqQuestion,
  iMcqQuestionExpectedKeys,
} from 'src/utils/interfaces/mcq-question.interface';
import { parseTemplate } from 'src/utils/template-parser';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  McqQuestion,
  McqQuestionDocument,
} from '../schemas/mcq/mcq-question.schema';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { successResponse } from 'src/utils/response-writer';
import { examType } from '../enums/exam-type.enum';

@Injectable()
export class UpdateMcqExamProvider {
  constructor(
    @InjectModel(McqQuestion.name)
    private readonly mcqQuestionModel: Model<McqQuestionDocument>,

    @InjectModel(Exam.name)
    private readonly examSchema: Model<ExamDocument>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async updateMcqExam(examId: string, mcqTemplate: Express.Multer.File) {

    const exam = await this.examSchema.findById(examId);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.examType !== examType.MCQ) {
      throw new BadRequestException('Exam mode is not MCQ')
    }

    const mcqList = parseTemplate<IMcqQuestion>(
      mcqTemplate,
      iMcqQuestionExpectedKeys,
    );

    if (mcqList.length === 0) {
      throw new BadRequestException('Questions template is empty');
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const operations = this.prepareListForBulkWrite(mcqList);

      let result = await this.mcqQuestionModel.bulkWrite(operations, {
        session,
      });

      const insertedQuestionIds = Object.values(result.upsertedIds || {});

      exam.questions.push(...insertedQuestionIds)
      await exam.save({session})

      await session.commitTransaction();

      return successResponse({ message: 'Exam updated successfully.' });
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(
        error.message || 'Failed to save exam questions',
      );
    } finally {
      await session.endSession();
    }
  }

  private prepareListForBulkWrite(mcqList: IMcqQuestion[]) {
    const collapseMcqList = mcqList.map((mcq) => ({
      question: mcq.Question,
      options: [mcq.A, mcq.B, mcq.C, mcq.D],
      answer: mcq['Correct Answer'],
    }));

    const operations = collapseMcqList.map((item) => ({
      updateOne: {
        filter: { question: item.question },
        update: { $set: item },
        upsert: true,
      },
    }));
    return operations;
  }
}
