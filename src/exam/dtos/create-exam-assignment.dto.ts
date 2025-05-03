import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { examSchemaEnum } from "../enums/exam-schema.enum";

export class CreateExamAssignmentDto {
    @IsString()
    @IsNotEmpty()
    examId: string;

    @IsString()
    @IsNotEmpty()
    studentId: string;

    @IsString()
    @IsNotEmpty()
    examSchema: examSchemaEnum;

    @IsDate()
    startTime?: Date;

    @IsDate()
    endTime?: Date;
}