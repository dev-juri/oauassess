import { Test, TestingModule } from '@nestjs/testing';
import { InsertStudentProvider } from './insert-student.provider';

describe('InsertStudentProvider', () => {
  let provider: InsertStudentProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsertStudentProvider],
    }).compile();

    provider = module.get<InsertStudentProvider>(InsertStudentProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
