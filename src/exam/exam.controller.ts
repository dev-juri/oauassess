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
} from '@nestjs/common';
import { CreateExamDto } from './dtos/create-mcq-exam.dto';
import { UpdateMcqExamParamDto } from './dtos/update-mcq-exam-param.dto';
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
import { Auth } from 'src/admin/auth/decorators/auth.decorator';
import { AuthType } from 'src/admin/auth/enums/auth-type.enum';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

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
          description: 'Optional tutorial file upload',
        },
      },
      required: ['courseName', 'courseCode', 'duration', 'questionCount', 'examType'],
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
    @Param() updateExamParamDto: UpdateMcqExamParamDto,
    @UploadedFile() mcqTemplate: Express.Multer.File,
  ) {
    return this.examService.updateMcqExam(updateExamParamDto.examId, mcqTemplate);
  }

  @Delete('mcq/:examId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an MCQ exam by ID' })
  @ApiParam({ name: 'examId', type: 'string', description: 'ID of the MCQ exam' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  public async deleteMcqExam(@Param('examId') examId: string) {
    return this.examService.deleteMcqExam(examId);
  }

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
    @Param() updateExamParamDto: UpdateMcqExamParamDto,
    @UploadedFiles() templates: Express.Multer.File[],
  ) {
    return this.examService.updateOeExam(updateExamParamDto.examId, templates);
  }

    @Delete('oe/:examId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an OE exam by ID' })
  @ApiParam({ name: 'examId', type: 'string', description: 'ID of the OE exam' })
  @ApiResponse({ status: 200, description: 'Exam deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  public async deleteOeExam(@Param('examId') examId: string) {
    return this.examService.deleteOeExam(examId);
  }
}