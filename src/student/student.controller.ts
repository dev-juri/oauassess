import { Body, Controller, Post } from '@nestjs/common';
import { LoginStudentDto } from './dtos/login-student.dto';
import { StudentService } from './providers/student.service';
import { Auth } from 'src/admin/auth/decorators/auth.decorator';
import { AuthType } from 'src/admin/auth/enums/auth-type.enum';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Auth(AuthType.None)
    @Post('auth')
    public async login(@Body() loginStudentDto: LoginStudentDto) {
        return this.studentService.loginStudent(loginStudentDto)
    }
}
