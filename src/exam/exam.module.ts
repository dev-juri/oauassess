import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './providers/exam.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService],
  imports: [StudentModule]
})
export class ExamModule {}
