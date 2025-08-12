interface GradingRequest {
  guideVectorId: string;
  oeExamGradingId: string;
  questionId: string;
  responseId: string;
  userResponse: string;
  questionText?: string;
}

interface GradingResult {
  oeExamGradingId: string;
  responseId: string;
  aiScore: number;
  aiComment: string;
}

interface OpenaiApiResponse {
  output: Array<{
    type: string;
    role?: string;
    content?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
}