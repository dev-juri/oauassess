import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { ExamAssignment } from './exam-assigment.schema';
import { OeQuestion } from './oe/oe-question.schema';
import { ref } from 'joi';

export type OeExamGradingDocument = HydratedDocument<OeExamGrading>;

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
export class OeExamGrading {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ExamAssignment', required: true })
  assignment: ExamAssignment;

  @Prop([
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'OeQuestion', required: true },
      userResponse: { type: String, required: true },
      aiComment: { type: String, default: null },
      aiScore: { type: Number, default: null },
    }
  ])
  responses: {
    questionId: OeQuestion;
    userResponse: string;
    aiComment?: string;
    aiScore?: number;
  }[];
}

export const OeExamGradingSchema = SchemaFactory.createForClass(OeExamGrading);
