/**
 * Interface representing a student assigned to take an exam.
 *
 * This includes the student's full name and matriculation number.
 */
export interface IStudent {
  /**
   * The full name of the student.
   */
  'FullName': string;

  /**
   * The matriculation number uniquely identifying the student.
   */
  'Matric No': string;
}

/**
 * List of expected keys in a valid student object.
 *
 * This is useful for validating structured data such as CSV or Excel file imports.
 */
export const iStudentExpectedKeys: (keyof IStudent)[] = [
  'FullName',
  'Matric No',
];
