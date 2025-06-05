import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './providers/admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new admin account' })
  @ApiCreatedResponse({
    description: 'Admin account successfully created'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Missing or invalid Bearer token',
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation failed' })
  public async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
}
