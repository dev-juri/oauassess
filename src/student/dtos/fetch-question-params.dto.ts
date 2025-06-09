import { IsNotEmpty, IsString } from "class-validator";

export class FetchQuestionParamsDto {
    @IsString()
    @IsNotEmpty()
    studentId: string;

    @IsString()
    @IsNotEmpty()
    examId: string;
}