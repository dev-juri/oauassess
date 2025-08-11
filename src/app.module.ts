import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { StudentModule } from './student/student.module';
import { CacheModule } from './cache/cache.module';
import { OpenaiModule } from './openai/openai.module';
import environmentValidation from './config/environment.validation';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`,
      validationSchema: environmentValidation,
      load: [appConfig, databaseConfig, cacheConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
    ExamModule,
    StudentModule,
    CacheModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
