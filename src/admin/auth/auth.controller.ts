import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './dtos/login.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@ApiTags('admin')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({
    description: 'Login successful'
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials or validation failed',
  })
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
