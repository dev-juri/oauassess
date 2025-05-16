import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/student/schemas/student.schema';
import { examSchemaEnum } from '../enums/exam-schema.enum';
import { Exam } from './exam.schema';

export type ExamAssignmentDocument = HydratedDocument<ExamAssignment>;

@Schema({
  timestamps: false,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class ExamAssignment {

  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'Exam', index: true })
  examId: Exam;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true })
  studentId: Student;

  @Prop()
  startTime?: Date;

  @Prop()
  endTime?: Date;
}

export const ExamAssignmentSchema = SchemaFactory.createForClass(ExamAssignment)
