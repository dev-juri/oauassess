import { Test, TestingModule } from '@nestjs/testing';
import { FetchExamAssignmentsProvider } from './fetch-exam-assignments.provider';

describe('FetchExamAssignmentsProvider', () => {
  let provider: FetchExamAssignmentsProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchExamAssignmentsProvider],
    }).compile();

    provider = module.get<FetchExamAssignmentsProvider>(FetchExamAssignmentsProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
