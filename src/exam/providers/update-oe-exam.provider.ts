import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  OeQuestion,
  OeQuestionDocument,
} from '../schemas/oe/oe-question.schema';
import { Connection, Model } from 'mongoose';
import { parseTemplate } from 'src/utils/template-parser';
import {
  iOeExpectedKeys,
  IOeQuestion,
} from 'src/utils/interfaces/oe-question.interface';
import { IResponse, successResponse } from 'src/utils/response-writer';
import { examType } from '../enums/exam-type.enum';

/**
 * Provider responsible for updating open-ended (OE) exams.
 */
@Injectable()
export class UpdateOeExamProvider {
  constructor(
    @InjectModel(OeQuestion.name)
    private readonly oeQuestionModel: Model<OeQuestionDocument>,

    @InjectModel(Exam.name)
    private readonly examSchema: Model<ExamDocument>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  /**
   * Updates an OE exam by inserting parsed questions from an uploaded template.
   *
   * - Verifies exam existence and type
   * - Parses OE questions template
   * - Inserts questions and links them to the exam
   *
   * @param examId - ID of the exam to update
   * @param markingGuide - File containing marking guide (not yet processed)
   * @param oeTemplate - File containing open-ended questions
   * @returns Success response if update completes
   *
   * @throws {NotFoundException} If exam is not found
   * @throws {BadRequestException} If exam type is not OE or questions are invalid
   */
  public async updateOeExam(
    examId: string,
    markingGuide: Express.Multer.File,
    oeTemplate: Express.Multer.File,
  ): Promise<IResponse> {
    const exam = await this.examSchema.findById(examId);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.examType !== examType.OE) {
      throw new BadRequestException('Exam mode is not OE');
    }

    const oeqList = parseTemplate<IOeQuestion>(oeTemplate, iOeExpectedKeys);

    if (oeqList.length === 0) {
      throw new BadRequestException('Question template is empty');
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const operations = oeqList.map((oeq) => ({
        insertOne: { document: { question: oeq.Question } },
      }));

      const result = await this.oeQuestionModel.bulkWrite(operations, {
        session,
      });

      const insertedQuestionIds = Object.values(result.insertedIds || {});

      // TODO: Create Assistant and update exam with assistantId

      exam.questions.push(...insertedQuestionIds);
      await exam.save({ session });

      await session.commitTransaction();

      return successResponse({ message: 'Exam updated successfully' });
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(
        error.message || 'Failed to save exam questions',
      );
    } finally {
      await session.endSession();
    }
  }
}
