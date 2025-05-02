import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-mcq-exam.dto';

@Injectable()
export class ExamService {
  constructor() {}

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
