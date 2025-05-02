import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type StudentDocument = HydratedDocument<Student>;

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
export class Student {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, index: true, unique: true })
  matricNo: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);