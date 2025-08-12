import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
    //   mailHost: process.env.MAIL_HOST,
    //   smtpUsername: process.env.SMTP_USERNAME,
    //   smtpPassword: process.env.SMTP_PASSWORD,
    openAiKey: process.env.OPENAI_KEY,
    openAiProjId: process.env.OPENAI_PROJ_ID
}));
