import { Test, TestingModule } from '@nestjs/testing';
import { TaskroommemberService } from './taskroommember.service';

describe('TaskroommemberService', () => {
  let service: TaskroommemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskroommemberService],
    }).compile();

    service = module.get<TaskroommemberService>(TaskroommemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
