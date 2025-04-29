import { Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './providers/admin.service';
import { CreateExamDto } from '../exam/dtos/create-exam.dto';
import { UpdateExamParamDto } from '../exam/dtos/update-exam-param.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-exam')
  public async createExam(createExamDto: CreateExamDto) {
    return "Exam created successfully!";
  }

  // Update an exam - examType, format: [MCQ | OE], files (questions file [.csv | .xls], marking scheme (for OE) [.pdf]
  @Patch('update-exam/:examId')
  public async updateExam(@Param() updateExamParamDto: UpdateExamParamDto) {
    return "Exam updated successfully!";
  }

  // Delete an exam
  @Delete('delete-exam')
  public async deleteExam() {
    return "Exam deleted successfully!";
  }
}
