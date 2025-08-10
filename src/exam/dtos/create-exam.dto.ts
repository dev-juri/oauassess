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

/**
 * Data Transfer Object for creating a new exam.
 * 
 * This DTO supports both multiple choice (MCQ) and open-ended exams. It ensures
 * that all required fields like course name, course code, duration, question count,
 * and exam type are provided with appropriate validation.
 */
export class CreateExamDto {
  /**
   * Name of the course for which the exam is being created.
   * 
   * @example 'Computer Science 101'
   */
  @ApiProperty({
    description: 'Name of the course for which the exam is being created',
    example: 'Computer Science 101',
  })
  @IsString()
  @IsNotEmpty()
  courseName: string;

  /**
   * Unique course code (minimum 6 characters).
   * 
   * @example 'CS101A'
   */
  @ApiProperty({
    description: 'Unique course code (minimum 6 characters)',
    example: 'CS101A',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  courseCode: string;

  /**
   * Duration of the exam in minutes. Must be at least 10.
   * 
   * @example 60
   */
  @ApiProperty({
    description: 'Exam duration in minutes (minimum 10)',
    example: 60,
    minimum: 10,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(10)
  duration: number;

  /**
   * Total number of questions in the exam. Must be at least 1.
   * 
   * @example 20
   */
  @ApiProperty({
    description: 'Number of questions in the exam (minimum 1)',
    example: 20,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  questionCount: number;

  /**
   * Type of exam: McqQuestion for MCQs or OeQuestion for Open-Ended.
   * 
   * @example 'McqQuestion'
   */
  @ApiProperty({
    description: 'Type of exam: McqQuestion for MCQs or OeQuestion for Open-Ended',
    enum: examType,
    example: examType.MCQ,
  })
  @IsEnum(examType, {
    message: 'examType must be either McqQuestion or OeQuestion',
  })
  @IsNotEmpty()
  examType: examType;
}
