import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-exam.dto';
import { UpdateExamParamDto } from './dtos/update-exam-param.dto';
import { ExamService } from './providers/exam.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GradeOeExamDto } from './dtos/grade-oe-exam.dto';
import { Auth } from 'src/admin/auth/decorators/auth.decorator';
import { AuthType } from 'src/admin/auth/enums/auth-type.enum';

/**
 * Controller for handling exam-related operations.
 * Supports creating, updating, and deleting MCQ and open-ended (OE) exams.
 */
@ApiBearerAuth()
@ApiTags('admin')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  /**
   * Create a new exam.
   *
   * Accepts a tutorial list in `.xlsx` format and exam metadata.
   *
   * @param createExamDto - DTO containing exam metadata
   * @param tutorialList - XLSX file upload with tutorial data
   * @returns Success response containing the created exam object
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('tutorialList'))
  @ApiOperation({ summary: 'Create a new exam with an optional tutorial file upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Exam details and optional tutorial file',
    schema: {
      type: 'object',
      properties: {
        courseName: { type: 'string', example: 'Introduction to Computing' },
        courseCode: { type: 'string', example: 'CSC101' },
        duration: { type: 'integer', example: 60 },
        questionCount: { type: 'integer', example: 20 },
        examType: {
          type: 'string',
          enum: ['McqQuestion', 'OeQuestion'],
          example: 'McqQuestion',
        },
        tutorialList: {
          type: 'string',
          format: 'binary',
          description: 'Tutorial file upload',
        },
      },
      required: ['courseName', 'courseCode', 'duration', 'questionCount', 'examType', 'tutorialList'],
    },
  })
  @ApiResponse({ status: 201, description: 'Exam created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid exam data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async createExam(
    @Body() createExamDto: CreateExamDto,
    @UploadedFile() tutorialList?: Express.Multer.File,
  ) {
    return this.examService.createExam(createExamDto, tutorialList);
  }

  @Get('/all')
  public async fetchExams() {
    return await this.examService.fetchExams();
  }

  /**
   * Upload a new MCQ template to update an existing exam.
   *
   * @param updateExamParamDto - DTO with the exam ID
   * @param mcqTemplate - XLSX file with updated MCQ questions
   * @returns Successful response containing the updated exam details
   */
  @Patch('mcq/:examId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('mcqList'))
  @ApiOperation({ summary: 'Update MCQ exam by uploading a new template file' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'examId', type: 'string', description: 'ID of the MCQ exam' })
  @ApiBody({
    description: 'MCQ template file',
    schema: {
      type: 'object',
      properties: {
        mcqList: {
          type: 'string',
          format: 'binary',
          description: 'New MCQ template file',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'MCQ exam updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file or parameters' })
  public async updateMcqExam(
    @Param() updateExamParamDto: UpdateExamParamDto,
    @UploadedFile() mcqTemplate: Express.Multer.File,
  ) {
    return this.examService.updateMcqExam(updateExamParamDto.examId, mcqTemplate);
  }

  /**
   * Delete an MCQ exam and its associated questions.
   *
   * @param examId - ID of the MCQ exam
   * @returns Deletion success message
   */
  @Delete('mcq/:examId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an MCQ exam by ID' })
  @ApiParam({ name: 'examId', type: 'string', description: 'ID of the MCQ exam' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  public async deleteMcqExam(@Param('examId') examId: string) {
    return this.examService.deleteMcqExam(examId);
  }

  /**
   * Update an OE exam with new marking guide and question templates.
   *
   * Accepts a `.docx` or `.pdf` marking guide and a `.xlsx` question file.
   *
   * @param updateExamParamDto - DTO with the exam ID
   * @param templates - Array of files (max 2): [marking guide, questions]
   * @returns Update result
   */
  @Patch('oe/:examId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('templates', 2))
  @ApiOperation({ summary: 'Update Open-ended exam with two required templates (e.g. mark guide and answers)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'examId', type: 'string', description: 'ID of the OE exam' })
  @ApiBody({
    description: 'Two template files: mark guide and answers',
    schema: {
      type: 'object',
      properties: {
        templates: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Open-ended exam updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid template files' })
  public async updateOeExam(
    @Param() updateParamDto: UpdateExamParamDto,
    @UploadedFiles() templates: Express.Multer.File[],
  ) {
    return this.examService.updateOeExam(updateParamDto.examId, templates);
  }

  /**
   * Delete an OE exam and its associated questions.
   *
   * @param examId - ID of the OE exam
   * @returns Deletion confirmation
   */
  @Delete('oe/:examId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an OE exam by ID' })
  @ApiParam({ name: 'examId', type: 'string', description: 'ID of the OE exam' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  public async deleteOeExam(@Param('examId') examId: string) {
    return this.examService.deleteOeExam(examId);
  }

  @Auth(AuthType.None)
  @Post('grade')
  public async(@Body() gradeOeExamDto: GradeOeExamDto) {
    return this.examService.gradeOeExam(gradeOeExamDto.examId);
  }
}
