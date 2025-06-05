import { BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';

/**
 * Parses an uploaded Excel file and maps it into a strongly-typed array of objects.
 *
 * This function ensures that the uploaded file contains the expected columns.
 *
 * @template T - The expected object structure based on column headers.
 * @param template - The uploaded file received through a multipart/form-data request.
 * @param expectedKeys - An array of keys (column headers) that must be present in the file.
 * @returns An array of objects parsed from the Excel file, typed as `T[]`.
 * @throws {BadRequestException} If the file is missing any required column or parsing fails.
 *
 * @example
 * ```ts
 * const questions = parseTemplate<IMcqQuestion>(file, iMcqQuestionExpectedKeys);
 * ```
 */
export function parseTemplate<T>(
  template: Express.Multer.File,
  expectedKeys: (keyof T)[]
): T[] | null {
  try {
    const workbook = XLSX.read(template.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const raw = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = raw[0] as string[];

    const missing = expectedKeys.filter(
      (key) => !headers.includes(key as string)
    );
    if (missing.length > 0) {
      throw new BadRequestException(
        `Missing required columns: ${missing.join(', ')}`
      );
    }

    const jsonData = XLSX.utils.sheet_to_json<T>(worksheet);

    return jsonData;
  } catch (error) {
    throw new BadRequestException(error.message || 'Error parsing template');
  }
}
