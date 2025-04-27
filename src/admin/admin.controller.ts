import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './providers/admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
