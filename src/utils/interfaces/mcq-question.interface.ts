/**
 * Interface representing the structure of a Multiple Choice Question (MCQ).
 *
 * Each MCQ includes a question, four possible answers labeled A through D,
 * and the correct answer.
 */
export interface IMcqQuestion {
  /**
   * The text of the question.
   */
  Question: string;

  /**
   * Option A.
   */
  A: string;

  /**
   * Option B.
   */
  B: string;

  /**
   * Option C.
   */
  C: string;

  /**
   * Option D.
   */
  D: string;

  /**
   * The correct answer (should match one of A, B, C, or D).
   */
  'Correct Answer': string;
}

/**
 * An array of the expected keys for a valid MCQ question object.
 *
 * This can be used for validation or checking the shape of imported data.
 */
export const iMcqQuestionExpectedKeys: (keyof IMcqQuestion)[] = [
  'Question',
  'A',
  'B',
  'C',
  'D',
  'Correct Answer',
];
