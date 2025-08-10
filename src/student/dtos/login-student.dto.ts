import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginStudentDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.toUpperCase())
    matricNo: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}