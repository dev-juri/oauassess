import { forwardRef, Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './providers/exam.service';
import { StudentModule } from 'src/student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './schemas/exam.schema';
import { ExamAssignment, ExamAssignmentSchema } from './schemas/exam-assigment.schema';
import { CreateExamProvider } from './providers/create-exam.provider';
import { UpdateMcqExamProvider } from './providers/update-mcq-exam.provider';
import { McqQuestion, McqQuestionSchema } from './schemas/mcq/mcq-question.schema';
import { UpdateOeExamProvider } from './providers/update-oe-exam.provider';
import { OeQuestion, OeQuestionSchema } from './schemas/oe/oe-question.schema';
import { FetchExamAssignmentsProvider } from './providers/fetch-exam-assignments.provider';
import { GradeOeExamProvider } from './providers/grade-oe-exam.provider';
import { OeExamGrading, OeExamGradingSchema } from './schemas/oe-exam-grading.schema';
import { OpenaiService } from 'src/openai/openai.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService, CreateExamProvider, UpdateMcqExamProvider, UpdateOeExamProvider, FetchExamAssignmentsProvider, GradeOeExamProvider],
  imports: [
    forwardRef(() => StudentModule),
    OpenaiModule,

    MongooseModule.forFeature([
      {
        name: Exam.name,
        schema: ExamSchema,
      },
      {
        name: ExamAssignment.name,
        schema: ExamAssignmentSchema,
      },
      {
        name: McqQuestion.name,
        schema: McqQuestionSchema
      },
      {
        name: OeQuestion.name,
        schema: OeQuestionSchema
      },
      {
        name: OeExamGrading.name,
        schema: OeExamGradingSchema
      }
    ]),
  ],
  exports: [FetchExamAssignmentsProvider, ExamService, GradeOeExamProvider]
})
export class ExamModule { }
