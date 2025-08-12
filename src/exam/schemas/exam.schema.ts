import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { examType } from '../enums/exam-type.enum';

export type ExamDocument = HydratedDocument<Exam>;

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
export class Exam {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  courseCode: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ enum: examType })
  examType: examType;

  @Prop({ required: true })
  questionCount: number;

  @Prop({ default: null })
  guideVectorStoreId?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, refPath: 'examType' }],
  })
  questions?: mongoose.Types.ObjectId[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
