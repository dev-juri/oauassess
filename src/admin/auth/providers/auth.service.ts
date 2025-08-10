import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { successResponse } from 'src/utils/response-writer';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/providers/admin.service';
import { GenerateTokenProvider } from './generate-token.provider';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async login(loginDto: LoginDto): Promise<any> {
    let user = await this.adminService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateTokenProvider.signToken(user._id.toHexString(), {
      email: user.email,
      name: user.name,
    });

    return successResponse({
      message: 'Login successful',
      data: { accessToken },
    });
  }
}
