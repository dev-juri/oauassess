import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { Connection, Model } from 'mongoose';
import { parseTemplate } from 'src/utils/template-parser';
import {
  iStudentExpectedKeys,
  IStudent,
} from 'src/utils/interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async insertStudents(
    tutorialList: Express.Multer.File,
  ): Promise<string[] | null> {
    let insertedStudentIds: string[] = [];

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Extract student data from the tutorial list template
      const students = parseTemplate<IStudent>(
        tutorialList,
        iStudentExpectedKeys,
      );

      const operations = students
        .filter((student) => student.matricNo)
        .map((student) => ({
          updateOne: {
            filter: { matricNo: student.matricNo },
            update: { $set: student },
            upsert: true,
          },
        }));

      await this.studentModel.bulkWrite(operations, { session });

      // Fetch all affected student IDs
      const affectedMatricNos = students.map((s) => s.matricNo);
      const affectedStudents = await this.studentModel
        .find({ matricNo: { $in: affectedMatricNos } }, '_id')
        .session(session);

      insertedStudentIds = affectedStudents.map((s) => s._id.toString());

      await session.commitTransaction();

      return insertedStudentIds;
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException(
        error.message || 'Failed to insert students',
      );
    } finally {
      session.endSession();
    }
  }
}
