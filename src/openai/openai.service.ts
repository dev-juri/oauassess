import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
    private readonly client: OpenAI;
    constructor(
        private readonly configService: ConfigService
    ) {
        this.client = new OpenAI({
            apiKey: configService.get<string>('appConfig.openAiKey')
        })
    }

    public async uploadMarkingGuide(markingGuide: Express.Multer.File, courseCode: string) {
        let uploadedFileId = undefined
        try {
            const uint8Array = new Uint8Array(markingGuide.buffer);
            const file = new File([uint8Array], markingGuide.originalname, {
                type: markingGuide.mimetype,
            });

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
            if (uploadedFileId) {
                await this.client.files.delete(uploadedFileId).catch(() => { });
            }
            throw error;
        }
    }

}
