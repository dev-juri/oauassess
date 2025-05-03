import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-mcq-exam.dto';
import { StudentService } from 'src/student/providers/student.service';

@Injectable()
export class ExamService {
  constructor(
    @Inject()
    private readonly studentService: StudentService
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

      // Insert the students into the database
      const students = await this.studentService.insertStudents(tutorialList);
      
      if (!students || students.length === 0) {
        throw new BadRequestException('No students found in the tutorial list');
      }
      // Create the exam in the database
    
  }

  public async updateMcqExam(examId: string, 
    tutorialList: Express.Multer.File) {
      // Add Exam questions

      // Assign the exam to the students
  }

  public async updateOeExam(examId: string, templates: Express.Multer.File[]) {
      // Add Exam questions

      // Setup AI grading model

      // Assign the exam to the students
  }

}
