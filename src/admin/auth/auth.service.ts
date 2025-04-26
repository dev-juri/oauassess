import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { successResponse } from 'src/utils/response-writer';
import { Admin } from './schema/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin.name)
        private readonly adminModel: Model<Admin>
    ) {}

  public async login(loginDto: any): Promise<any> {

    let user = await this.adminModel.findOne({ email: loginDto.email }).select('+password');
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return successResponse({
      message: 'Login successful',
      data: { user: loginDto },
    });
  }
}
