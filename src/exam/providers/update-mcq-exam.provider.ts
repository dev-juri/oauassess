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
import { IResponse, successResponse } from 'src/utils/response-writer';
import { examType } from '../enums/exam-type.enum';

/**
 * Provider responsible for updating MCQ exams by parsing a template file and storing the questions.
 */
@Injectable()
export class UpdateMcqExamProvider {
  constructor(
    @InjectModel(McqQuestion.name)
    private readonly mcqQuestionModel: Model<McqQuestionDocument>,

    @InjectModel(Exam.name)
    private readonly examSchema: Model<ExamDocument>,

    @InjectConnection()
    private readonly connection: Connection,
  ) { }

  /**
   * Updates an MCQ exam with questions from an uploaded template file.
   *
   * - Verifies exam existence and type
   * - Parses and validates the MCQ template
   * - Saves new or updated MCQ questions to the database
   * - Links questions to the exam using a transactional operation
   *
   * @param examId - ID of the exam to update
   * @param mcqTemplate - File containing MCQ questions
   * @returns Success response if operation completes
   *
   * @throws {NotFoundException} If exam is not found
   * @throws {BadRequestException} If exam type is not MCQ or template is invalid
   */
  public async updateMcqExam(
    examId: string,
    mcqTemplate: Express.Multer.File,
  ): Promise<IResponse> {
    const exam = await this.examSchema.findById(examId);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.examType !== examType.MCQ) {
      throw new BadRequestException('Exam mode is not MCQ');
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

      const result = await this.mcqQuestionModel.bulkWrite(operations, {
        session,
      });

      const insertedQuestionIds = Object.values(result.insertedIds || {});
      exam.questions.push(...insertedQuestionIds);
      await exam.save({ session });

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

  /**
   * Prepares a bulk write operation list from an array of parsed MCQ questions.
   *
   * @param mcqList - Parsed MCQ questions
   * @returns List of MongoDB bulk write operations
   */
  private prepareListForBulkWrite(mcqList: IMcqQuestion[]) {
    const collapseMcqList = mcqList.map((mcq) => ({
      question: mcq.Question,
      options: [mcq.A, mcq.B, mcq.C, mcq.D],
      answer: mcq['Correct Answer'],
    }));

    const operations = collapseMcqList.map((item) => ({
      insertOne: {
        document: item,
      },
    }));
    return operations;
  }
}