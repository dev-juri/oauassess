import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { Model } from 'mongoose';
import { CreateAdminDto } from '../dtos/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  public async findUserByEmail(email: string): Promise<AdminDocument | null> {
    let user = await this.adminModel.findOne({ email }).select('+password');
    if (!user) {
      return null;
    }

    return user;
  }

  public async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return await newAdmin.save();
  }
}
