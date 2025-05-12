export interface IStudent {
  'FullName': string;
  'Matric No': string;
}

export const iStudentExpectedKeys: (keyof IStudent)[] = [
  'FullName',
  'Matric No',
];
