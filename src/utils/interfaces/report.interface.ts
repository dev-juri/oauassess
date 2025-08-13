export interface QuestionResponse {
  question: string;
  studentResponse: string;
  aiScore?: number;
  aiComment?: string;
}

export interface StudentResponseData {
  totalScore: string,
  studentName: string;
  matricNumber: string;
  responses: QuestionResponse[];
}