import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type McqQuestionDocument = HydratedDocument<McqQuestion>;

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
export class McqQuestion {
  @Prop({ required: true, unique: true })
  question: string;

  @Prop({ type: [String], required: true  })
  options: string[];

  @Prop({ required: true })
  answer: string;
}

export const McqQuestionSchema = SchemaFactory.createForClass(McqQuestion);
