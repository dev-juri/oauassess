import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { Connection, Model } from 'mongoose';
import { parseTemplate } from 'src/utils/template-parser';
import { IStudent } from 'src/utils/interfaces/student.interface';

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

    // Extract student data from the tutorial list template
    const students = parseTemplate<IStudent>(tutorialList);

    if (!students || students.length === 0) {
      return insertedStudentIds;
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const operations = students.map((student) => ({
        updateOne: {
          filter: { matricNo: student.MatricNo }, // Change to your unique key
          update: { $set: student },
          upsert: true,
        },
      }));

      console.log('Bulk operations:', operations);

      await this.studentModel.bulkWrite(operations, { session });

      // Fetch all affected student IDs
      const affectedMatricNos = students.map((s) => s.MatricNo);
      const affectedStudents = await this.studentModel
        .find({ matricNo: { $in: affectedMatricNos } }, '_id')
        .session(session);

      insertedStudentIds = affectedStudents.map((s) => s._id.toString());

      await session.commitTransaction();

      console.log('Inserted student IDs:', insertedStudentIds);
      return insertedStudentIds;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error during bulk insert:', error);
      throw new InternalServerErrorException('Failed to insert students');
    } finally {
      session.endSession();
    }
  }
}
