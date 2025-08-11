interface GradingRequest {
  oeExamId: string;
  assignmentId: string;
  questionId: string;
  responseId: string;
  userResponse: string;
  questionText?: string;
}

interface GradingResult {
  oeExamId: string;
  responseId: string;
  aiScore: number;
  aiComment: string;
}