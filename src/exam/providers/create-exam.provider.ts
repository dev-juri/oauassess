import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-mcq-exam.dto';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { StudentService } from 'src/student/providers/student.service';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateExamAssignmentDto } from '../dtos/create-exam-assignment.dto';
import { examType } from '../enums/exam-type.enum';
import { examSchemaEnum } from '../enums/exam-schema.enum';
import {
  ExamAssignment,
  ExamAssignmentDocument,
} from '../schemas/exam-assigment.schema';
import { successResponse } from 'src/utils/response-writer';

@Injectable()
export class CreateExamProvider {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    @Inject()
    private readonly studentService: StudentService,

    @InjectModel(Exam.name)
    private readonly mcqExamModel: Model<ExamDocument>,

    @InjectModel(ExamAssignment.name)
    private readonly examAssignmentModel: Model<ExamAssignmentDocument>,
  ) {}

  public async createExam(
    createExamDto: CreateExamDto,
    tutorialList: Express.Multer.File,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();

    // Insert the students into the database
    const students = await this.studentService.insertStudents(tutorialList);

    if (!students || students.length === 0) {
      throw new BadRequestException('No students found in the tutorial list');
    }

    try {
      // Create the exam in the database
      const exam = await this.mcqExamModel.create(createExamDto);
      await exam.save({ session });

      const operations = students.map((student) => ({
        updateOne: {
          filter: { examId: exam._id, studentId: student },
          update: {
            $set: {
              examId: exam._id.toString(),
              studentId: student,
              examSchema:
                createExamDto.examType == examType.MCQ
                  ? examSchemaEnum.McqExam
                  : examSchemaEnum.TheoryExam,
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
      session.abortTransaction();
      throw new BadRequestException('Error creating exam');
    } finally {
      session.endSession();
    }
  }
}
