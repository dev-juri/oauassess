import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginStudentDto } from './dtos/login-student.dto';
import { StudentService } from './providers/student.service';
import { Auth } from 'src/admin/auth/decorators/auth.decorator';
import { AuthType } from 'src/admin/auth/enums/auth-type.enum';
import { FetchQuestionParamsDto } from './dtos/fetch-question-params.dto';
import { SubmitMcqExamDto } from './dtos/submit-mcq-exam.dto';

@Auth(AuthType.None)
@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Post('auth')
    public async login(@Body() loginStudentDto: LoginStudentDto) {
        return this.studentService.loginStudent(loginStudentDto)
    }

    @Get(':studentId/assignments')
    public async fetchExams(@Param('studentId') studentId: string) {
        return this.studentService.fetchStudentAssignments(studentId)
    }

    @Get(':studentId/assignments/:examId')
    public async fetchQuestions(@Param() fetchQuestionparamsDto: FetchQuestionParamsDto) {
        return this.studentService.fetchQuestionsForStudent(fetchQuestionparamsDto)
    }

    @Post('submit/mcq')
    public async submitMcqExam(@Body() submitMcqExamDto: SubmitMcqExamDto) {
        return this.studentService.submitMcqExam(submitMcqExamDto)
    }
    
    @Post(':studentId/submit/oe')
    public async submitOeExam() {}

}
