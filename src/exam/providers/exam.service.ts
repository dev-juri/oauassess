import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { CreateExamProvider } from './create-exam.provider';
import { UpdateMcqExamProvider } from './update-mcq-exam.provider';
import { Model } from 'mongoose';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { InjectModel } from '@nestjs/mongoose';
import { successResponse } from 'src/utils/response-writer';
import { McqQuestion } from '../schemas/mcq/mcq-question.schema';
import { UpdateOeExamProvider } from './update-oe-exam.provider';
import { OeQuestion } from '../schemas/oe/oe-question.schema';
import { GradeOeExamProvider } from './grade-oe-exam.provider';
import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';
import * as XLSX from 'xlsx';
import { QuestionResponse, StudentResponseData } from 'src/utils/interfaces/report.interface';
import * as puppeteer from 'puppeteer';
import * as archiver from 'archiver';
import { Readable } from 'stream';
import { generateHTMLTemplate } from 'src/utils/generate-html-template';
import { OeExamGrading } from '../schemas/oe-exam-grading.schema';
import { examType } from '../enums/exam-type.enum';

/**
 * Service responsible for managing exams and their related operations.
 * Delegates creation and updates to appropriate providers based on exam type.
 */
@Injectable()
export class ExamService {
  constructor(
    private readonly createExamProvider: CreateExamProvider,
    private readonly updateMcqExamProvider: UpdateMcqExamProvider,
    private readonly updateOeExamProvider: UpdateOeExamProvider,
    private readonly gradeOeExamProvider: GradeOeExamProvider,

    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,

    @InjectModel(McqQuestion.name)
    private readonly mcqQuestionModel: Model<McqQuestion>,

    @InjectModel(OeQuestion.name)
    private readonly oeQuestionModel: Model<OeQuestion>,

    @InjectModel(OeExamGrading.name)
    private readonly oeExamGradingModel: Model<OeExamGrading>,

    @InjectModel(ExamAssignment.name)
    private readonly examAssignmentModel: Model<ExamAssignmentDocument>,
  ) { }

  public async fetchExams() {
    const exams = await this.examModel.find();
    return successResponse({ message: "Exams retrieved successfully", data: exams });
  }

  /**
   * Creates a new exam and assigns it to students from the uploaded list.
   *
   * @param createExamDto - Exam creation data
   * @param tutorialList - XLSX file containing student list
   * @returns Response object with created exam
   *
   * @throws {BadRequestException} If file is not a valid .xlsx format
   */
  public async createExam(
    createExamDto: CreateExamDto,
    tutorialList: Express.Multer.File,
  ) {
    if (
      !tutorialList ||
      tutorialList.mimetype !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException('Only .xlsx files are allowed');
    }

    return this.createExamProvider.createExam(createExamDto, tutorialList);
  }

  /**
   * Updates an existing MCQ exam by uploading new question templates.
   *
   * @param examId - ID of the exam to update
   * @param mcqTemplate - XLSX file containing MCQ questions
   * @returns Response on successful update
   *
   * @throws {BadRequestException} If file is not a valid .xlsx format
   */
  public async updateMcqExam(examId: string, mcqTemplate: Express.Multer.File) {
    if (
      !mcqTemplate ||
      mcqTemplate.mimetype !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new BadRequestException('Only .xlsx files are allowed');
    }

    return this.updateMcqExamProvider.updateMcqExam(examId, mcqTemplate);
  }

  /**
   * Deletes an MCQ exam and all its associated questions.
   *
   * @param examId - ID of the exam to delete
   * @returns Response confirming deletion
   *
   * @throws {NotFoundException} If exam is not found
   */
  public async deleteMcqExam(examId: string) {
    const exam = await this.fetchExam(examId)

    if (exam.questions?.length) {
      await this.mcqQuestionModel.deleteMany({ _id: { $in: exam.questions } });
    }

    await this.examModel.findByIdAndDelete(examId);

    return successResponse({ message: 'Exam and related questions deleted' });
  }

  /**
   * Updates an open-ended (OE) exam with new questions and marking guide.
   *
   * @param examId - ID of the exam to update
   * @param templates - Array of files including XLSX for questions and DOCX/PDF for marking guide
   * @returns Response on successful update
   *
   * @throws {BadRequestException} If required files are missing or invalid
   */
  public async updateOeExam(examId: string, templates: Express.Multer.File[]) {
    let mGuide: Express.Multer.File;
    let oeTemplate: Express.Multer.File;

    if (!templates) {
      throw new BadRequestException(
        'You need to provide the templates to update exam',
      );
    }

    for (const template of templates) {
      console.log(template.mimetype)
      if (
        template.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        template.mimetype === 'application/pdf'
      ) {
        mGuide = template;
      } else if (
        template.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        oeTemplate = template;
      }
    }

    if (!mGuide) {
      throw new BadRequestException(
        'Please provide the marking guide in .docx or .pdf format',
      );
    }

    if (!oeTemplate) {
      throw new BadRequestException(
        'Please provide the questions in .xlsx format',
      );
    }

    return this.updateOeExamProvider.updateOeExam(examId, mGuide, oeTemplate);
  }

  /**
   * Deletes an open-ended (OE) exam and all its associated questions.
   *
   * @param examId - ID of the exam to delete
   * @returns Response confirming deletion
   *
   * @throws {NotFoundException} If exam is not found
   */
  public async deleteOeExam(examId: string) {
    const exam = await this.fetchExam(examId)

    if (exam.questions?.length) {
      await this.oeQuestionModel.deleteMany({ _id: { $in: exam.questions } });
    }

    await this.examModel.findByIdAndDelete(examId);

    return successResponse({ message: 'Exam and related questions deleted' });
  }


  public async fetchExam(examId: string) {
    const exam = await this.examModel.findById(examId);

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    return exam
  }

  public async gradeOeExam(examId: string) {
    return this.gradeOeExamProvider.gradeOeResponses(examId)
  }

  /**
    * Generate report for a specific exam
    * @param examId - The ID of the exam
    * @returns 
    */
  async generateExamReport(examId: string) {
    const assignments = await this.examAssignmentModel
      .find({ exam: examId, isCompleted: true, score: { $ne: null } })
      .populate('student', 'fullName matricNo')
      .populate('exam', 'courseName courseCode')
      .exec();

    if (assignments.length === 0) {
      throw new Error('No completed assignments found for this exam');
    }

    const examTitle = `${assignments[0].exam.courseCode} - ${assignments[0].exam.courseName}`;

    const students = assignments.map(assignment => ({
      studentName: assignment.student.fullName,
      matricNumber: assignment.student.matricNo,
      score: assignment.score
    }));

    return successResponse({
      message: "Report generated successfully", data: {
        examTitle,
        examId,
        students,
      }
    });
  }

  /**
     * Generate Excel buffer for exam report
     * @param examId - The ID of the exam
     * @returns Promise<{ buffer: Buffer, courseName: string }>
     */
  async generateExcelReport(examId: string): Promise<{ buffer: Buffer, courseName: string }> {
    const report = await this.generateExamReport(examId);

    const workbook = XLSX.utils.book_new();

    const excelData = [
      // Header information
      ['Exam Report'],
      ['Exam Title:', report.data.examTitle],
      [],
      // Column headers
      ['Student Name', 'Matric Number', 'Score'],
      // Student data
      ...report.data.students.map(student => [
        student.studentName,
        student.matricNumber,
        student.score
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // Style the columns
    worksheet['!cols'] = [
      { width: 25 },
      { width: 15 },
      { width: 10 }
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Exam Report');

    const buffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
      compression: true
    });

    const courseName = report.data.examTitle.split(' (')[0] || 'Report';

    return { buffer: Buffer.from(buffer), courseName };
  }

  /**
   * Get all student responses for an exam
   * @param examId - The ID of the exam
   * @returns Promise<StudentResponseData[]>
   */
  async getStudentResponses(examId: string): Promise<StudentResponseData[]> {
    const assignments = await this.examAssignmentModel
      .find({ exam: examId, isCompleted: true })
      .populate('student', 'fullName matricNo')
      .populate('exam', 'courseName courseCode')
      .exec();

    if (assignments.length === 0) {
      throw new Error('No completed assignments found for this exam');
    }

    const assignmentIds = assignments.map(assignment => assignment._id);

    const examGradings = await this.oeExamGradingModel
      .find({ assignment: { $in: assignmentIds } })
      .populate({
        path: 'assignment',
        select: '_id student exam isCompleted score',
        populate: [
          { path: 'student', select: 'fullName matricNo' },
          { path: 'exam', select: 'courseName courseCode' }
        ]
      })
      .populate('responses.questionId', 'question')
      .exec();

    const studentResponses: StudentResponseData[] = [];

    for (const assignment of assignments) {
      const assignmentId = assignment._id.toString();

      const grading = examGradings.find(g =>
        (g.assignment as ExamAssignmentDocument)._id.toString() === assignmentId
      );

      let responses: QuestionResponse[] = [];

      if (grading && grading.responses && grading.responses.length > 0) {

        responses = grading.responses.map((response, index) => {
          const questionData = response.questionId as any;

          return {
            totalScore: assignment.score,
            questionNumber: index + 1,
            question: questionData?.question || 'Question text not available',
            studentResponse: response.userResponse || 'No response provided',
            aiScore: response.aiScore || null,
            aiComment: response.aiComment || null,
          };
        });
      }

      const studentData = {
        totalScore: assignment.score.toString(),
        studentName: assignment.student.fullName,
        matricNumber: assignment.student.matricNo,
        responses: responses,
      };

      studentResponses.push(studentData);
    }

    return studentResponses;
  }

  /**
     * Generate ZIP file containing all student PDFs
     * @param examId - The ID of the exam
     * @returns Promise<{buffer: Buffer, courseCode: string}>
     */
  async generateStudentResponsesZip(examId: string): Promise<{ buffer: Buffer, courseCode: string }> {

    const exam = await this.fetchExam(examId);
    if (exam.examType != examType.OE) {
      throw new BadRequestException("Scripts can only be generated for open ended exams")
    }

    const assignments = await this.examAssignmentModel
      .find({ exam: examId, isCompleted: true })
      .populate('student', 'fullName matricNo')
      .populate('exam', 'courseName courseCode examType')
      .exec();

    if (assignments.length === 0) {
      throw new Error('No completed assignments found for this exam');
    }

    const courseInfo = assignments[0].exam;
    const courseCode = courseInfo?.courseCode;

    const studentResponses = await this.getStudentResponses(examId);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const chunks: Buffer[] = [];

    const zipPromise = new Promise<Buffer>((resolve, reject) => {
      archive.on('data', (chunk) => chunks.push(chunk));
      archive.on('end', () => resolve(Buffer.concat(chunks)));
      archive.on('error', reject);
    });

    for (const studentData of studentResponses) {
      try {
        const pdfBuffer = await this.generateStudentPDF(studentData, courseInfo);
        const matric = studentData.matricNumber.replace(/\//g, "").trim()
        const fileName = `${matric}.pdf`;
        archive.append(pdfBuffer, { name: fileName });
      } catch (error) {
      }
    }

    await archive.finalize();

    const buffer = await zipPromise;

    return { buffer, courseCode };
  }

  /**
   * Generate PDF for a single student
   * @param studentData - Student response data
   * @param courseInfo - Course information
   * @returns Promise<Buffer> - PDF buffer
   */
  async generateStudentPDF(studentData: StudentResponseData, courseInfo: any): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      const html = generateHTMLTemplate(studentData, courseInfo);

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }

}