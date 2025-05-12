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
import { Auth } from 'src/admin/auth/decorators/auth.decorator';
import { AuthType } from 'src/admin/auth/enums/auth-type.enum';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @HttpCode(HttpStatus.CREATED)
  @Auth(AuthType.None)
  @Post()
  @UseInterceptors(FileInterceptor('tutorialList'))
  public async createExam(
    @Body() createExamDto: CreateExamDto,
    @UploadedFile() tutorialList: Express.Multer.File,
  ) {
    return this.examService.createExam(createExamDto, tutorialList);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('mcq/:examId')
  @UseInterceptors(FileInterceptor('mcqList'))
  public async updateMcqExam(
    @Param() updateExamParamDto: UpdateMcqExamParamDto,
    @UploadedFile() mcqTemplate: Express.Multer.File,
  ) {
    return this.examService.updateMcqExam(updateExamParamDto.examId, mcqTemplate);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('mcq/:examId')
  public async deleteMcqExam(@Param('examId') examId: string) {
    return this.examService.deleteMcqExam(examId)
  }

  @HttpCode(HttpStatus.OK)
  @Patch('oe/:examId')
  @UseInterceptors(FilesInterceptor('templates', 2))
  public async updateOeExam(
    @Param() updateExamParamDto: UpdateMcqExamParamDto,
    @UploadedFiles() templates: Express.Multer.File[],
  ) {
    return this.examService.updateOeExam(updateExamParamDto.examId, templates);
  }
}
