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
        return `You are an expert exam grader. Your task is to grade student responses based on the grading guide provided in the vector store.
        Always return a valid JSON string that follows the type { score: number, comment: your concise feedback of how you alloted mark }.
        Guidelines:
        1 Refer to the marking guide in the vector store, it contains the question and the rubric to be used.
        2 Be objective and consistent in your grading
        3 Provide constructive feedback in your comment
        4 Consider partial credit where appropriate
        5 Be specific about what the student did well and what they missed
        6 Ensure your score reflects the quality of the response according to the rubric`;
    }

    public async gradeRequests(gradingRequests: GradingRequest[]): Promise<GradingResult[]> {
        const results: GradingResult[] = [];

        for (const request of gradingRequests) {
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
                            results.push({
                                assignmentId: request.assignmentId,
                                oeExamGradingId: request.oeExamGradingId,
                                responseId: request.responseId,
                                aiScore: parsed.score,
                                aiComment: parsed.comment
                            });
                        }
                    } catch (err) {
                        throw new Error(`Failed to parse assistant JSON: ${(err as Error).message}`);
                    }
                } else {
                    results.push({
                        assignmentId: request.assignmentId,
                        oeExamGradingId: request.oeExamGradingId,
                        responseId: request.responseId,
                        aiScore: 0,
                        aiComment: "No response received from API"
                    });
                }
            } catch (error) {
                console.error('Error with Responses API:', error);
                results.push({
                    assignmentId: request.assignmentId,
                    oeExamGradingId: request.oeExamGradingId,
                    responseId: request.responseId,
                    aiScore: 0,
                    aiComment: "API error - please review manually"
                });
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
