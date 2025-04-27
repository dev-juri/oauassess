import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/providers/auth.service';
import { AdminService } from './providers/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { GenerateTokenProvider } from './auth/providers/generate-token.provider';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [AdminController, AuthController],
  providers: [AuthService, AdminService, GenerateTokenProvider],
})
export class AdminModule {}
