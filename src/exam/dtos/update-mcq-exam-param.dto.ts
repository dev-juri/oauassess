import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMcqExamParamDto {
    @IsString()
    @IsNotEmpty()
    examId: string;
}