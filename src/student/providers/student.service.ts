import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name)
        private readonly studentModel: Model<StudentDocument>,
    ) {}

    public async insertStudents(tutorialList: Express.Multer.File): Promise<StudentDocument[] | null> {
        

        return null
    }
}
