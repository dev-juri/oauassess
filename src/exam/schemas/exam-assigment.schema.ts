import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/student/schemas/student.schema';
import { examSchemaEnum } from '../enums/exam-schema.enum';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'examSchema', index: true })
  examId: mongoose.Types.ObjectId;

  @Prop({ type: String, enum: examSchemaEnum, required: true })
  examSchema: examSchemaEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true })
  studentId: Student;

  @Prop()
  startTime?: Date;

  @Prop()
  endTime?: Date;
}

export const ExamAssignmentSchema = SchemaFactory.createForClass(ExamAssignment)
