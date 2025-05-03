export interface IStudent {
  fullName: string;
  matricNo: string;
}

export const iStudentExpectedKeys: (keyof IStudent)[] = [
  'fullName',
  'matricNo',
];
