interface McqQuestionCache {
    id: string;
    question: string;
    options: string[];
}

interface OeQuestionCache {
    id: string;
    question: string;
}

type CachedQuestion = McqQuestionCache | OeQuestionCache;