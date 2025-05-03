import { BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';

export function parseTemplate<T>(template: Express.Multer.File): T[] {
  try {
    const workbook = XLSX.read(template.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json<T>(worksheet);

    return jsonData;
  } catch (error) {
    throw new BadRequestException(
      'Invalid template format. Please upload a valid Excel file.',
    );
  }
}
