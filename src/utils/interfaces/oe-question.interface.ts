/**
 * Interface representing the structure of an Open-Ended (OE) question.
 *
 * This type of question contains only the question text and expects a written response from the student.
 */
export interface IOeQuestion {
  /**
   * The text of the open-ended question.
   */
  Question: string;
}

/**
 * An array of the expected keys for a valid open-ended question object.
 *
 * Useful for validating imported data or ensuring consistency.
 */
export const iOeExpectedKeys: (keyof IOeQuestion)[] = ['Question'];
