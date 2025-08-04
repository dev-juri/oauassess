import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class StudentAnswerDto {
    @IsString()
    @IsNotEmpty()
    questionId: string;

    @IsString()
    @MaxLength(1500)
    answer: string;
}