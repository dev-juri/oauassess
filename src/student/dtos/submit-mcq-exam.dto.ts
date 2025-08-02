import { IsArray, IsNotEmpty, IsString, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

export class StudentAnswerDto {
    @IsString()
    @IsNotEmpty()
    questionId: string;

    @IsString()
    answer: string;
}

export class SubmitMcqExamDto {
    @IsString()
    @IsNotEmpty()
    examId: string;

    @IsString()
    @IsNotEmpty()
    studentId: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StudentAnswerDto)
    responses: StudentAnswerDto[];
}