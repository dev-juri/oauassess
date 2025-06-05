import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMcqExamParamDto {
  @ApiProperty({
    description: 'Unique identifier of the MCQ exam to update',
    example: 'exam_123abc',
  })
  @IsString()
  @IsNotEmpty()
  examId: string;
}
