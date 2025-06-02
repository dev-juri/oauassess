import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { StudentModule } from './student/student.module';
import environmentValidation from './config/environment.validation';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { CacheModule } from '@nestjs/cache-manager';

const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
  imports: [
    AdminModule,
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      validationSchema: environmentValidation,
      load: [appConfig, databaseConfig],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
