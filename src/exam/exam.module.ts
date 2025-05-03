import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './providers/exam.service';
import { StudentModule } from 'src/student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { McqExam, McqExamSchema } from './schemas/mcq-exam.schema';
import { ExamAssignment, ExamAssignmentSchema } from './schemas/exam-assigment.schema';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
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
    ]),
  ],
})
export class ExamModule {}
