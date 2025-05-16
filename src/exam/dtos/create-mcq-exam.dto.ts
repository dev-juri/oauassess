import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { examType } from '../enums/exam-type.enum';

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

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  questionCount: number;

  @IsEnum(examType, {
    message: 'examType must be either McqQuestion or OeQuestion',
  })
  @IsNotEmpty()
  examType: examType;
}
