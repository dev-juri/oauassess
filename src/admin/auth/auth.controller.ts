import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './dtos/login.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    @Auth(AuthType.None)
    @UseInterceptors(ClassSerializerInterceptor)
    public async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
}
