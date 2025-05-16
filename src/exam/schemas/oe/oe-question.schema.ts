import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OeQuestionDocument = HydratedDocument<OeQuestion>;

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
export class OeQuestion {
    @Prop()
    question: string
}

export const OeQuestionSchema = SchemaFactory.createForClass(OeQuestion)