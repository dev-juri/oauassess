import { IsNotEmpty, IsString } from "class-validator";

export class UpdateExamParamDto {
    @IsString()
    @IsNotEmpty()
    examId: string;
}