import { Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './providers/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
