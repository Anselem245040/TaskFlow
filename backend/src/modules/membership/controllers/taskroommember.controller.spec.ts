import { Test, TestingModule } from '@nestjs/testing';
import { TaskroommemberController } from './taskroommember.controller';

describe('TaskroommemberController', () => {
  let controller: TaskroommemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskroommemberController],
    }).compile();

    controller = module.get<TaskroommemberController>(TaskroommemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
