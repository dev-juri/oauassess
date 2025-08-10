import { IsArray, IsNotEmpty, IsString, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";
import { StudentAnswerDto } from "./student-answer.dto";

export class SubmitMcqExamDto {
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