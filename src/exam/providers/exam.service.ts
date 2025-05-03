import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-mcq-exam.dto';
import { StudentService } from 'src/student/providers/student.service';
import {
  McqExam,
  McqExamDocument,
  McqExamSchema,
} from '../schemas/mcq-exam.schema';
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
export class ExamService {
  constructor(
    @Inject()
    private readonly studentService: StudentService,

    @InjectModel(McqExam.name)
    private readonly mcqExamSchema: Model<McqExamDocument>,

    @InjectModel(ExamAssignment.name)
    private readonly examAssignmentSchema: Model<ExamAssignmentDocument>,

    @InjectConnection()
    private readonly connection: Connection,
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

    const session = await this.connection.startSession();
    session.startTransaction();

    // Insert the students into the database
    const students = await this.studentService.insertStudents(tutorialList);

    if (!students || students.length === 0) {
      throw new BadRequestException('No students found in the tutorial list');
    }

    try {
      // Create the exam in the database
      const exam = await this.mcqExamSchema.create(createExamDto);
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

      await this.examAssignmentSchema.bulkWrite(operations, { session });
      await session.commitTransaction();

      return successResponse({
        message: 'Exam created successfully',
        data: { exam },
      });
    } catch (error) {
      console.error( error);
      session.abortTransaction();
      throw new BadRequestException('Error creating exam');
    } finally {
      session.endSession();
    }
  }

  public async updateMcqExam(
    examId: string,
    tutorialList: Express.Multer.File,
  ) {
    // Add Exam questions
    // Assign the exam to the students
  }

  public async updateOeExam(examId: string, templates: Express.Multer.File[]) {
    // Add Exam questions
    // Setup AI grading model
    // Assign the exam to the students
  }
}
