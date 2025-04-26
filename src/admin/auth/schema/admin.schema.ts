import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from "@nestjs/common";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop()
    lastLogin?: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw new InternalServerErrorException('Error hashing password');
    }
});