import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
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

  @Auth(AuthType.None)
  @Post()
  @UseInterceptors(FileInterceptor('tutorialList'))
  public async createExam(
    createExamDto: CreateExamDto,
    @UploadedFile() tutorialList: Express.Multer.File,
  ) {
    return this.examService.createExam(createExamDto, tutorialList);
  }

  @Patch('mcq/:examId')
  @UseInterceptors(FileInterceptor('mcqList'))
  public async updateMcqExam(
    @Param() updateExamParamDto: UpdateMcqExamParamDto,
    @UploadedFile() mcqList: Express.Multer.File,
  ) {
    return this.examService.updateMcqExam(updateExamParamDto.examId, mcqList);
  }

  @Patch('oe/:examId')
  @UseInterceptors(FilesInterceptor('templates', 2))
  public async updateOeExam(
    @Param() updateExamParamDto: UpdateMcqExamParamDto,
    @UploadedFiles() templates: Express.Multer.File[],
  ) {
    return this.examService.updateOeExam(updateExamParamDto.examId, templates);
  }
}
