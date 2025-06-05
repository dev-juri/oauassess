import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for extracting the `examId` from the URL path
 * when updating or deleting an exam (MCQ or OE).
 */
export class UpdateExamParamDto {
  /**
   * Unique identifier of the exam to update or delete.
   * 
   * Example: `exam_123abc`
   */
  @ApiProperty({
    description: 'Unique identifier of the exam to update or delete',
    example: 'exam_123abc',
  })
  @IsString()
  @IsNotEmpty()
  examId: string;
}
