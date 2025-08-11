import { IsNotEmpty, IsString } from "class-validator";

export class GradeOeExamDto {
    @IsString()
    @IsNotEmpty()
    examId: string;
}