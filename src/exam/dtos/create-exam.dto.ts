import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateExamDto {
    @IsString()
    @IsNotEmpty()
    courseName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    courseCode: string;

    @IsInt()
    @IsNotEmpty()
    @Min(10)
    duration: number; // in minutes
}