import { IsNotEmpty } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  assigneeId: string;
}
