import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { StudentService } from 'src/student/providers/student.service';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateExamAssignmentDto } from '../dtos/create-exam-assignment.dto';
import {
  ExamAssignment,
  ExamAssignmentDocument,
} from '../schemas/exam-assigment.schema';
import { IResponse, successResponse } from 'src/utils/response-writer';

/**
 * Provider responsible for creating exams and assigning them to students.
 */
@Injectable()
export class CreateExamProvider {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,

    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,

    @InjectModel(ExamAssignment.name)
    private readonly examAssignmentModel: Model<ExamAssignmentDocument>,
  ) {}

  /**
   * Creates a new exam and assigns it to students parsed from the uploaded tutorial list.
   *
   * - Parses student data from file
   * - Creates an exam record
   * - Assigns exam to each student
   * - Uses a transaction to ensure atomicity
   *
   * @param createExamDto - Exam creation data
   * @param tutorialList - Uploaded file containing student information
   * @returns Success response with created exam details
   *
   * @throws {BadRequestException} If student list is empty or any DB operation fails
   */
  public async createExam(
    createExamDto: CreateExamDto,
    tutorialList: Express.Multer.File,
  ): Promise<IResponse> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const students = await this.studentService.insertStudents(tutorialList);

    if (!students || students.length === 0) {
      throw new BadRequestException('No students found in the tutorial list');
    }

    try {
      const exam = await this.examModel.create(createExamDto);
      await exam.save({ session });

      const operations = students.map((student) => ({
        updateOne: {
          filter: { exam: exam._id, student: student },
          update: {
            $set: {
              exam: exam._id.toString(),
              student: student,
              examSchema: exam.examType,
            } as CreateExamAssignmentDto,
          },
          upsert: true,
        },
      }));

      await this.examAssignmentModel.bulkWrite(operations, { session });
      await session.commitTransaction();

      return successResponse({
        message: 'Exam created successfully',
        data: { exam },
      });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      throw new BadRequestException('Error creating exam');
    } finally {
      session.endSession();
    }
  }
}