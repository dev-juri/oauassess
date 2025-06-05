import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { examType } from '../enums/exam-type.enum';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for assigning an exam to a student.
 * 
 * Contains identifiers for the exam and student, exam type,
 * and optional scheduling details such as start and end times.
 */
export class CreateExamAssignmentDto {
  /**
   * Unique identifier of the exam to assign.
   * 
   * @example 'exam_abc123'
   */
  @ApiProperty({
    description: 'ID of the exam to assign',
    example: 'exam_abc123',
  })
  @IsString()
  @IsNotEmpty()
  exam: string;

  /**
   * Unique identifier of the student receiving the exam.
   * 
   * @example 'student_xyz456'
   */
  @ApiProperty({
    description: 'ID of the student receiving the exam',
    example: 'student_xyz456',
  })
  @IsString()
  @IsNotEmpty()
  student: string;

  /**
   * The type of the exam.
   * 
   * Possible values are defined in the examType enum,
   * e.g., MCQ or Open Ended.
   * 
   * @example examType.MCQ
   */
  @ApiProperty({
    description: 'Type of the exam (MCQ or Open Ended)',
    enum: examType,
    example: examType.MCQ,
  })
  @IsEnum(examType)
  examSchema: examType;

  /**
   * Optional start time of the exam in ISO 8601 date-time format.
   * 
   * Defines when the exam becomes available to the student.
   * 
   * @example '2025-06-04T09:00:00Z'
   */
  @ApiProperty({
    description: 'Exam start time in ISO 8601 date-time format',
    example: '2025-06-04T09:00:00Z',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startTime?: Date;

  /**
   * Optional end time of the exam in ISO 8601 date-time format.
   * 
   * Defines when the exam will no longer be accessible.
   * 
   * @example '2025-06-04T10:00:00Z'
   */
  @ApiProperty({
    description: 'Exam end time in ISO 8601 date-time format',
    example: '2025-06-04T10:00:00Z',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;
}
