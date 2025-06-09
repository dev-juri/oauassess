import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { Model } from 'mongoose';
import { InsertStudentProvider } from './insert-student.provider';
import { LoginStudentDto } from '../dtos/login-student.dto';
import { successResponse } from 'src/utils/response-writer';
import { ExamService } from 'src/exam/providers/exam.service';
import { FetchExamAssignmentsProvider } from 'src/exam/providers/fetch-exam-assignments.provider';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,

    private readonly insertStudentProvider: InsertStudentProvider,

    @Inject(forwardRef(() => FetchExamAssignmentsProvider))
    private readonly fetchExamAssignmentsProviders: FetchExamAssignmentsProvider,

  ) { }

  public async loginStudent(loginStudentDto: LoginStudentDto) {

    let student = await this.studentModel.findOne({ matricNo: loginStudentDto.matricNo })
    if (!student) {
      throw new NotFoundException('Student with matric number does not exist.')
    }

    if (student.fullName.split(' ')[0].toLowerCase() != loginStudentDto.password.toLowerCase()) {
      throw new UnauthorizedException('Incorrect password')
    }

    return successResponse({ message: 'Login Successful', data: student })
  }

  public async insertStudents(
    tutorialList: Express.Multer.File,
  ): Promise<string[] | null> {
    return this.insertStudentProvider.insertStudents(tutorialList)
  }

  public async fetchStudentAssignments(studentId: string) {
    const result = await this.fetchExamAssignmentsProviders.getAssignmentsForStudent(studentId)

    return successResponse({ message: 'Exam Assignments for Student fetched', data: result })
  }
}
