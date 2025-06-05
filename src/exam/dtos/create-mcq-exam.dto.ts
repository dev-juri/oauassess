import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Name of the course',
    example: 'Computer Science 101',
  })
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty({
    description: 'Code of the course',
    example: 'CS101A',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  courseCode: string;

  @ApiProperty({
    description: 'Duration of the exam in minutes',
    example: 60,
    minimum: 10,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(10)
  duration: number; // in minutes

  @ApiProperty({
    description: 'Number of questions in the exam',
    example: 20,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  questionCount: number;

  @ApiProperty({
    description: 'Type of exam',
    enum: examType,
    example: examType.MCQ,
  })
  @IsEnum(examType, {
    message: 'examType must be either McqQuestion or OeQuestion',
  })
  @IsNotEmpty()
  examType: examType;
}