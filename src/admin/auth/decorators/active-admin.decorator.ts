import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ActiveAdminData } from '../interfaces/active-admin-data.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export const ActiveAdmin = createParamDecorator(
  (field: keyof ActiveAdminData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveAdminData = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
