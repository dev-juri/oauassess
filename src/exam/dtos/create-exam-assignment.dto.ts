import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { examType } from '../enums/exam-type.enum';

export class CreateExamAssignmentDto {
  @ApiProperty({
    description: 'ID of the exam to assign',
    example: 'exam_abc123',
  })
  @IsString()
  @IsNotEmpty()
  exam: string;

  @ApiProperty({
    description: 'ID of the student receiving the exam',
    example: 'student_xyz456',
  })
  @IsString()
  @IsNotEmpty()
  student: string;

  @ApiProperty({
    description: 'Type of the exam (MCQ or Open Ended)',
    enum: examType,
    example: examType.MCQ,
  })
  @IsString()
  @IsNotEmpty()
  examSchema: examType;

  @ApiProperty({
    description: 'Exam start time in ISO format',
    example: '2025-06-04T09:00:00Z',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsDate()
  startTime?: Date;

  @ApiProperty({
    description: 'Exam end time in ISO format',
    example: '2025-06-04T10:00:00Z',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsDate()
  endTime?: Date;
}
