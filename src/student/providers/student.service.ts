import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { Model } from 'mongoose';
import { InsertStudentProvider } from './insert-student.provider';
import { LoginStudentDto } from '../dtos/login-student.dto';
import { successResponse } from 'src/utils/response-writer';
import { ExamService } from 'src/exam/providers/exam.service';
import { FetchExamAssignmentsProvider } from 'src/exam/providers/fetch-exam-assignments.provider';
import { FetchQuestionParamsDto } from '../dtos/fetch-question-params.dto';
import { SubmitMcqExamDto } from '../dtos/submit-mcq-exam.dto';
import { SubmitOeExamDto } from '../dtos/submit-oe-exam.dto';
import { GradeOeExamProvider } from 'src/exam/providers/grade-oe-exam.provider';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,

    private readonly insertStudentProvider: InsertStudentProvider,

    @Inject(forwardRef(() => FetchExamAssignmentsProvider))
    private readonly fetchExamAssignmentsProvider: FetchExamAssignmentsProvider,

    @Inject(forwardRef(() => ExamService))
    private readonly examService: ExamService,

    private readonly gradeOeExamProvider: GradeOeExamProvider,

  ) { }

  public async loginStudent(loginStudentDto: LoginStudentDto) {

    let student = await this.studentModel.findOne({ matricNo: loginStudentDto.matricNo })
    if (!student) {
      throw new NotFoundException('Student with matric number does not exist.')
    }

    if (student.fullName.split(' ')[0].toLowerCase() != loginStudentDto.password.toLowerCase()) {
      throw new UnauthorizedException('Incorrect password')
    }

    return successResponse({ message: 'Login Successful', data: student })
  }

  public async insertStudents(
    tutorialList: Express.Multer.File,
  ): Promise<string[] | null> {
    return this.insertStudentProvider.insertStudents(tutorialList)
  }

  public async fetchStudentAssignments(studentId: string) {
    const result = await this.fetchExamAssignmentsProvider.getAssignmentsForStudent(studentId)

    return successResponse({ message: 'Exam Assignments for Student fetched', data: result })
  }

  public async fetchQuestionsForStudent(fetchQuestionParamsDto: FetchQuestionParamsDto) {
    const exam = await this.examService.fetchExam(fetchQuestionParamsDto.examId);

    const questions = await this.fetchExamAssignmentsProvider.generateAndCacheQuestions(fetchQuestionParamsDto.studentId, exam)

    return successResponse({ message: "Questions retrieved successfully", data: questions })
  }

  public async submitMcqExam(submitMcqExamDto: SubmitMcqExamDto) {
    const scores = await Promise.all(
      submitMcqExamDto.responses.map(async (response) => {
        const question = await this.fetchExamAssignmentsProvider.getCachedMcqQuestion(response.questionId);

        if (question && question.answer === response.answer) {
          return 1;
        }
        return 0;
      })
    );

    const totalScore = scores.reduce((sum, score) => sum + score, 0);

    await this.fetchExamAssignmentsProvider.updateStudentMcqScore(submitMcqExamDto.examId, submitMcqExamDto.studentId, totalScore);

    return successResponse({ message: "Exam Successfully Submitted." })
  }

  public async submitOeExam(submitOeExamDto: SubmitOeExamDto) {
    await this.gradeOeExamProvider.submitResponses(submitOeExamDto)
    return successResponse({ message: "Exam Successfully Submitted." })
  }
}
