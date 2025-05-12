import { BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';

export function parseTemplate<T>(
  template: Express.Multer.File,
  expectedKeys: (keyof T)[],
): T[] | null {
  try {
    const workbook = XLSX.read(template.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const raw = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = raw[0] as string[];

    const missing = expectedKeys.filter(
      (key) => !headers.includes(key as string),
    );
    if (missing.length > 0) {
      throw new BadRequestException(
        `Missing required columns: ${missing.join(', ')}`,
      );
    }

    const jsonData = XLSX.utils.sheet_to_json<T>(worksheet);

    return jsonData;
  } catch (error) {
    throw new BadRequestException(error.message || 'Error parsing template');
  }
}
