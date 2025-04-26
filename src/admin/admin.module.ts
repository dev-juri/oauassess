import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './auth/schema/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController, AuthController],
  providers: [AuthService, AdminService],
})
export class AdminModule {}
