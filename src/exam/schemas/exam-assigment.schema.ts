import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/student/schemas/student.schema';
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exam', index: true })
  exam: Exam;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true })
  student: Student;

  @Prop()
  startTime?: Date;

  @Prop()
  endTime?: Date;

  @Prop({ type: Boolean, default: false })
  isCompleted: Boolean;

  @Prop({ type: Number, default: null })
  score?: Number
}

export const ExamAssignmentSchema = SchemaFactory.createForClass(ExamAssignment)
