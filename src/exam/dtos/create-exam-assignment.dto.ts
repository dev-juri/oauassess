import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { examSchemaEnum } from "../enums/exam-schema.enum";

export class CreateExamAssignmentDto {
    @IsString()
    @IsNotEmpty()
    exam: string;

    @IsString()
    @IsNotEmpty()
    student: string;

    @IsString()
    @IsNotEmpty()
    examSchema: examSchemaEnum;

    @IsDate()
    startTime?: Date;

    @IsDate()
    endTime?: Date;
}