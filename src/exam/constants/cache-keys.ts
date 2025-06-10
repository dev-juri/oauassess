
export function generateMcqQuestionCacheKey(questionId) : string {
    return `mcq-question:${questionId}`
}

export function generateExamQuestionsCacheKey(studentId: string, examId: string) : string {
    return `exam-questions:${studentId}:${examId}`
}