import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ResponseFileSearchToolCall } from 'openai/resources/responses/responses';
import { config } from 'process';

@Injectable()
export class OpenaiService {
    private readonly client: OpenAI;
    constructor(
        private readonly configService: ConfigService
    ) {
        this.client = new OpenAI({
            apiKey: configService.get<string>('appConfig.openAiKey'),
            project: configService.get<string>('appConfig.openAiProjId')
        })
    }

    private buildGradingPrompt(request: GradingRequest): string {
        return `Question: ${request.questionText}\n Student Response: ${request.userResponse}`;
    }

    private getGradingInstructions(): string {
        return `You are an expert exam grader. Your task is to grade student responses based on the grading guide provided in the vector store. Always return a valid JSON string that follows the type { score: number, comment: string }. Guidelines: 1) Strictly follow the marking guide in the vector store (contains question + rubric). 2) Always break down your comment into rubric components, showing how marks were allotted. Use the format: "The student wrote X which corresponds to Y in the guide (m/total)." 3) Keep comments concise, structured, and objective. 4) Award partial credit when applicable. 5) Always state what was done well, what was partially correct, and what was missing, with marks per section. 6) The score must equal the sum of marks given in the breakdown. Example response: { "score": 7, "comment": "The student explained xyz which matches abc in the guide (3/3). They partially mentioned def but missed key detail (2/4). No attempt on ghi (0/3)." }`;
    }

    public async gradeRequests(gradingRequests: GradingRequest[]): Promise<GradingResult[]> {
        const results: GradingResult[] = [];
        const batchSize = 5;

        for (let i = 0; i < gradingRequests.length; i += batchSize) {
            const batch = gradingRequests.slice(i, i + batchSize);

            const batchPromises = batch.map(async (request) => {
                try {
                    const response = await this.client.responses.create({
                        model: "gpt-4o",
                        instructions: this.getGradingInstructions(),
                        input: this.buildGradingPrompt(request),
                        tools: [
                            {
                                type: "file_search",
                                vector_store_ids: [request.guideVectorId],
                                max_num_results: 1
                            }
                        ],
                        max_output_tokens: 300,
                    });

                    if (response.output) {
                        const aiResponse = (response as OpenaiApiResponse).output[1].content[0].text.toString()
                        const cleanedResponse = aiResponse.replace(/```json\s*|```/g, "").trim();

                        try {
                            const parsed = JSON.parse(cleanedResponse);
                            if (typeof parsed.score === "number" && typeof parsed.comment === "string") {
                                return {
                                    assignmentId: request.assignmentId,
                                    oeExamGradingId: request.oeExamGradingId,
                                    responseId: request.responseId,
                                    aiScore: parsed.score,
                                    aiComment: parsed.comment
                                };
                            }
                        } catch (err) {
                            console.error(`JSON parsing error for request ${request.responseId}:`, err);
                        }
                    }

                    return {
                        assignmentId: request.assignmentId,
                        oeExamGradingId: request.oeExamGradingId,
                        responseId: request.responseId,
                        aiScore: null,
                        aiComment: null
                    };
                } catch (error) {
                    console.error(`Error with Responses API for request ${request.responseId}:`, error);
                    return {
                        assignmentId: request.assignmentId,
                        oeExamGradingId: request.oeExamGradingId,
                        responseId: request.responseId,
                        aiScore: null,
                        aiComment: null
                    };
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);

            if (i + batchSize < gradingRequests.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        return results;
    }

    public async uploadMarkingGuide(markingGuide: Express.Multer.File, courseCode: string) {
        let uploadedFileId = undefined
        try {
            const uint8Array = new Uint8Array(markingGuide.buffer);
            const file = new File([uint8Array], `${markingGuide.originalname}`, {
                type: markingGuide.mimetype,
            });
            console.log(markingGuide.originalname)

            const uploadedFile = await this.client.files.create({
                file: file,
                purpose: "user_data",
            });

            uploadedFileId = uploadedFile.id

            const vectorStore = await this.client.vectorStores.create({
                name: `${courseCode}-mg`,
                expires_after: {
                    anchor: "last_active_at",
                    days: 2
                }
            });

            await this.client.vectorStores.files.create(
                vectorStore.id,
                {
                    file_id: uploadedFile.id,
                }
            );

            return vectorStore;
        } catch (error) {
            console.log(error)
            if (uploadedFileId) {
                await this.client.files.delete(uploadedFileId).catch(() => { });
            }
            throw error;
        }
    }

}
