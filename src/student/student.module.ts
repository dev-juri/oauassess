import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './providers/student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { InsertStudentProvider } from './providers/insert-student.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService, InsertStudentProvider],
  exports: [StudentService]
})
export class StudentModule {}
