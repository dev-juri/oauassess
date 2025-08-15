import { Student } from "src/student/schemas/student.schema";
import { StudentResponseData } from "./interfaces/report.interface";

/**
 * Generate HTML template for student response
 * @param studentData - Student response data
 * @param courseInfo - Course information
 * @returns string - HTML content
 */
export function generateHTMLTemplate(studentData: StudentResponseData, courseInfo: any): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Response - ${studentData.studentName}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                margin-bottom: 0;
            }
            
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 300;
            }
            
            .student-info {
                background: white;
                padding: 25px;
                border: 1px solid #e0e0e0;
                border-top: none;
                border-radius: 0 0 10px 10px;
                margin-bottom: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .info-row {
                display: flex;
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .info-label {
                font-weight: 600;
                color: #555;
                width: 200px;
                flex-shrink: 0;
            }
            
            .info-value {
                color: #333;
                font-weight: 400;
            }
            
            .question-container {
                background: white;
                margin-bottom: 30px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                border: 1px solid #e0e0e0;
            }
            
            .question-header {
                background: #f8f9fa;
                padding: 20px;
                border-bottom: 2px solid #e9ecef;
            }
            
            .question-title {
                font-weight: 600;
                color: #495057;
                font-size: 18px;
                margin-bottom: 10px;
            }
            
            .question-text {
                color: #666;
                font-size: 16px;
                line-height: 1.8;
                font-style: italic;
            }
            
            .response-section {
                padding: 25px;
            }
            
            .response-label {
                font-weight: 600;
                color: #333;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .student-response {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #007bff;
                margin-bottom: 25px;
                font-size: 15px;
                line-height: 1.7;
                color: #333;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            
            .ai-section {
                display: flex;
                gap: 20px;
                margin-top: 20px;
            }
            
            .ai-score-container {
                flex: 0 0 150px;
            }
            
            .ai-score {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
                border: 1px solid rgba(40, 167, 69, 0.2);
            }
            
            .ai-score-label {
                font-size: 12px;
                font-weight: 500;
                opacity: 0.9;
                margin-bottom: 5px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .ai-score-value {
                font-size: 24px;
                font-weight: 700;
                margin: 0;
            }
            
            .ai-comment-container {
                flex: 1;
            }
            
            .ai-comment {
                background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
                padding: 18px;
                border-radius: 8px;
                border: 1px solid rgba(255, 234, 167, 0.8);
                box-shadow: 0 3px 10px rgba(250, 177, 160, 0.2);
            }
            
            .ai-comment-label {
                font-weight: 600;
                color: #d63031;
                margin-bottom: 8px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .ai-comment-text {
                color: #2d3436;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
                font-style: italic;
            }
            
            .no-ai-feedback {
                background: #e9ecef;
                color: #6c757d;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-style: italic;
                border: 1px dashed #ced4da;
            }
            
            .page-break {
                page-break-after: always;
            }
            
            @media print {
                body {
                    background-color: white;
                    max-width: none;
                    margin: 0;
                    padding: 15px;
                }
                
                .question-container {
                    break-inside: avoid;
                    margin-bottom: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${courseInfo?.courseName || 'Course'} (${courseInfo?.courseCode || 'N/A'}) - Student Response</h1>
        </div>
        
        <div class="student-info">
            <div class="info-row">
                <span class="info-label">Student Name:</span>
                <span class="info-value">${studentData.studentName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Student Matric Number:</span>
                <span class="info-value">${studentData.matricNumber}</span>
            </div>
        </div>
        <div class="ai-score-container">
            <div class="ai-score">
                <div class="ai-score-label">Total Score</div>
                    <div class="ai-score-value">${studentData.totalScore}</div>
                </div>
            </div>
        </div>

        ${studentData.responses.map((response, index) => `
            <div class="question-container">
                <div class="question-header">
                    <div class="question-title">Question:</div>
                    <div class="question-text">${response.question}</div>
                </div>
                
                <div class="response-section">
                    <div class="response-label">Student's Response:</div>
                    <div class="student-response">${response.studentResponse}</div>
                    
                    ${response.aiScore !== null && response.aiScore !== undefined || response.aiComment ? `
                        <div class="ai-section">
                            ${response.aiScore !== null && response.aiScore !== undefined ? `
                                <div class="ai-score-container">
                                    <div class="ai-score">
                                        <div class="ai-score-label">AI Score</div>
                                        <div class="ai-score-value">${response.aiScore}%</div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${response.aiComment ? `
                                <div class="ai-comment-container">
                                    <div class="ai-comment">
                                        <div class="ai-comment-label">AI Comment</div>
                                        <p class="ai-comment-text">${response.aiComment}</p>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    ` : `
                        <div class="no-ai-feedback">No AI feedback available for this response</div>
                    `}
                </div>
            </div>
        `).join('')}
    </body>
    </html>`;
}