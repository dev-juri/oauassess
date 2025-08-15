import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { successResponse } from 'src/utils/response-writer';
import { ExamAssignment, ExamAssignmentDocument } from '../schemas/exam-assigment.schema';
import * as XLSX from 'xlsx';
import { QuestionResponse, StudentResponseData } from 'src/utils/interfaces/report.interface';
import * as puppeteer from 'puppeteer';
import * as archiver from 'archiver';
import { generateHTMLTemplate } from 'src/utils/generate-html-template';
import { OeExamGrading } from '../schemas/oe-exam-grading.schema';
import { examType } from '../enums/exam-type.enum';
import { ExamDocument } from '../schemas/exam.schema';

@Injectable()
export class ExamReportProvider {
    constructor(
        @InjectModel(OeExamGrading.name)
        private readonly oeExamGradingModel: Model<OeExamGrading>,

        @InjectModel(ExamAssignment.name)
        private readonly examAssignmentModel: Model<ExamAssignmentDocument>,
    ) { }

    /**
      * Generate report for a specific exam
      * @param examId - The ID of the exam
      * @returns 
      */
    async generateExamReport(exam: ExamDocument) {

        const assignments = await this.examAssignmentModel
            .find({ exam: exam._id, isCompleted: true, score: { $ne: null } })
            .populate('student', 'fullName matricNo')
            .exec();

        const examTitle = `${exam.courseCode} - ${exam.courseName}`;

        if (assignments.length === 0) {
            return successResponse({
                message: "Report generated successfully", data: {
                    examTitle,
                    examId: exam._id,
                    students: []
                }
            })
        }


        const students = assignments.map(assignment => ({
            studentName: assignment.student.fullName,
            matricNumber: assignment.student.matricNo,
            score: assignment.score
        }));

        return successResponse({
            message: "Report generated successfully", data: {
                examTitle,
                examId: exam._id,
                students,
            }
        });
    }

    /**
       * Generate Excel buffer for exam report
       * @param examId - The ID of the exam
       * @returns Promise<{ buffer: Buffer, courseName: string }>
       */
    async generateExcelReport(exam: ExamDocument): Promise<{ buffer: Buffer, courseName: string }> {
        const report = await this.generateExamReport(exam);

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
    async generateStudentResponsesZip(exam: ExamDocument): Promise<{ buffer: Buffer, courseCode: string }> {

        const examId = exam._id.toString()

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
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        try {
            const page = await browser.newPage();
            const html = generateHTMLTemplate(studentData, courseInfo);

            await page.setViewport({ width: 800, height: 600 });
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
