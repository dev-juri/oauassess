import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './providers/admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { Auth } from './auth/decorators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  public async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto)
  }
}
