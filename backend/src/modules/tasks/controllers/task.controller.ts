import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RoomAccessGuard } from 'src/modules/rooms/guards/room-access.guard';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskService } from '../services/task.service';
import { ActiveUser } from 'src/modules/auth/decorators/active-user.decorator';
import { RoomAccess } from 'src/modules/rooms/decorators/room-access.decorator';
import { AssignTaskDto } from '../dtos/assign-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { string } from 'joi';

@UseGuards(JwtAuthGuard, RoomAccessGuard) // Add appropriate guards for authentication/authorization
@Controller('task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Creates a new task within a specified room. The user must be an owner of the room to create a task.',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. User must be authenticated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. User does not have access to the room.',
  })
  @HttpCode(201)
  @Post('/rooms/:roomId')
  @RoomAccess('owner') // Use appropriate HTTP method and route
  async createTask(
    @Param('roomId') roomId: string,
    @ActiveUser() user: { id: string },
    @Body() createTaskDto: CreateTaskDto,
  ) {
    // Implementation for creating a task goes here
    return await this.tasksService.createTask(roomId, user.id, createTaskDto);
  }

  @ApiOperation({
    summary: 'Assign a task to a room member',
    description:
      'Assigns an existing task to a member of the room. The user must be an owner of the room to assign a task.',
  })
  @ApiBody({
    type: AssignTaskDto,
    schema: { example: { taskId: 'task-uuid', assigneeId: 'user-uuid' } },
  })
  @ApiResponse({ status: 200, description: 'Task assigned successfully.' })
  @HttpCode(HttpStatus.OK)
  @Patch('/rooms/:roomId/assign')
  public async assignTask(
    @Param('roomId') roomId: string,
    @Body() assignTaskDto: AssignTaskDto,
    @ActiveUser() user: { id: string },
  ) {
    // Implementation for assigning a task goes here
    return this.tasksService.assignTask(
      assignTaskDto.taskId,
      assignTaskDto.assigneeId,
      user.id,
    );
  }

  @ApiOperation({
    summary: 'Get all tasks in a room',
    description:
      'Retrieves a list of all tasks within a specified room. The user must be a member of the room to view its tasks.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/rooms/:roomId')
  @RoomAccess('member') // Use appropriate HTTP method and route
  public async getTasksByRoom(@Param('roomId') roomId: string) {
    // Implementation for retrieving tasks by room goes here
    return await this.tasksService.getAllTasksInRoom(roomId);
  }

  @ApiOperation({
    summary: 'Update a task in a room',
    description: 'Updates an already created task',
  })
  @ApiBody({
    schema: {
      example: {
        type: UpdateTaskDto,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated succesfully',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/:taskId')
  @RoomAccess('owner')
  public async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @ApiOperation({
    summary: 'Get single Task',
    description: 'Get task in room',
  })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:roomId/:taskId')
  public async getSingleTask(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.tasksService.getSingleTask(roomId, taskId);
  }

  @ApiOperation({
    summary: 'Deleted a task',
    description: 'Task Deletion',
  })
  @ApiResponse({
    status: 200,
    description: 'Task Deleted succesfully',
  })
  @RoomAccess('owner')
  @HttpCode(HttpStatus.OK)
  @Delete('/:roomId/:taskId')
  public async deleteTask(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.tasksService.deleteATask(roomId, taskId)
  }
}
