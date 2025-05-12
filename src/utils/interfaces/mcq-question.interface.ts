export interface IMcqQuestion {
    Question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    'Correct Answer': string;
}

export const iMcqQuestionExpectedKeys : (keyof IMcqQuestion)[] = [
    "Question",
    "A",
    "B",
    "C",
    "D",
    "Correct Answer"
]