import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { McqQuestion } from './mcq-question.schema';
import { examType } from '../enums/exam-type.enum';

export type McqExamDocument = HydratedDocument<McqExam>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class McqExam {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  courseCode: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ enum: examType })
  examType: examType;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'McqQuestion' }] })
  questions?: McqQuestion[];
}

export const McqExamSchema = SchemaFactory.createForClass(McqExam);
