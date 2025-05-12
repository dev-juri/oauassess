import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './providers/exam.service';
import { StudentModule } from 'src/student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { McqExam, McqExamSchema } from './schemas/mcq-exam.schema';
import { ExamAssignment, ExamAssignmentSchema } from './schemas/exam-assigment.schema';
import { CreateExamProvider } from './providers/create-exam.provider';
import { UpdateMcqExamProvider } from './providers/update-mcq-exam.provider';
import { McqQuestion, McqQuestionSchema } from './schemas/mcq-question.schema';

@Module({
  controllers: [ExamController],
  providers: [ExamService, CreateExamProvider, UpdateMcqExamProvider],
  imports: [
    StudentModule,
    MongooseModule.forFeature([
      {
        name: McqExam.name,
        schema: McqExamSchema,
      },
      {
        name: ExamAssignment.name,
        schema: ExamAssignmentSchema,
      },
      {
        name: McqQuestion.name,
        schema: McqQuestionSchema
      }
    ]),
  ],
})
export class ExamModule {}
