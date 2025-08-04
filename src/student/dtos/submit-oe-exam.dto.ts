import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { StudentAnswerDto } from "./student-answer.dto";
import { Type } from "class-transformer";

export class SubmitOeExamDto {

    @IsString()
    @IsNotEmpty()
    studentId: string;

    @IsString()
    @IsNotEmpty()
    examId: string;
    

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StudentAnswerDto)
    responses: StudentAnswerDto[];
}