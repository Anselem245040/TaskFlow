import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import {
  RoomMemberRole,
  RoomMemberStatus,
  TaskRoomMember,
} from 'src/modules/membership/entities/taskroommember.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { RoomsService } from 'src/modules/rooms/services/rooms.service';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Room } from 'src/modules/rooms/entities/room.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskRoomMember)
    private membershipRepository: Repository<TaskRoomMember>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly roomsservice: RoomsService,
  ) {}

  async createTask(
    roomId: string,
    userId: string,
    createTaskDto: CreateTaskDto,
  ) {
    const room = await this.roomsservice.getRoomDetails(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // Check if the user is a member of the room
    const membership = await this.membershipRepository.findOne({
      where: {
        userId,
        taskRoomId: roomId,
        status: RoomMemberStatus.ACCEPTED,
        role: RoomMemberRole.OWNER,
      },
    });
    if (!membership) {
      throw new Error('User is not a member of the room');
    }
    if (membership.role !== RoomMemberRole.OWNER) {
      throw new Error('Only room owners can create tasks');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      room: { id: roomId },
      createdBy: { id: userId },
    });

    console.log('DTO:', createTaskDto);

    return await this.taskRepository.save(task);
  }

  async assignTask(taskId: string, assigneeId: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, createdBy: { id: userId } },
      relations: ['room'],
    });

    if (!task) {
      throw new Error('Task not found or user is not the creator');
    }

    const membership = await this.membershipRepository.findOne({
      where: {
        userId: assigneeId, // ✅ userId, not membership id
        taskRoomId: task.room.id,
        status: RoomMemberStatus.ACCEPTED,
      },
    });

    if (!membership) {
      throw new Error('Assignee is not a member of the room');
    }

    task.assignedTo = { id: assigneeId } as any; // ✅ assigneeId is a USER id
    await this.taskRepository.save(task);
  }

  async getAllTasksInRoom(roomId: string) {
    const task = await this.taskRepository.find({
      where: { room: { id: roomId } },
      relations: ['createdBy', 'assignedTo'],
      select: {
        id: true,
        title: true,
        status: true,
        dueDate: true,
        createdAt: true,

        createdBy: {
          id: true,
          name: true,
        },

        assignedTo: {
          id: true,
          name: true,
        },
        // Load tasks with
      },
    });

    if (task.length === 0) {
      throw new NotFoundException('No tasks found in this room');
    }

    return task;
  }

  async getSingleTask(roomId: string, taskId: string) {
    const room = await this.roomsservice.getRoomDetails(roomId);

    if (!room) {
      throw new NotFoundException('This room does not exist');
    }

    const task = await this.taskRepository.findOne({
      where: { room: { tasks: { id: taskId } } },
    });

    if (!task) {
      throw new NotFoundException('Task does not exist');
    }

    return task;
  }

  async updateTask(taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('There is no such task in this room');
    }

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);
    return { message: 'Task was updated successfully', task: updatedTask };
  }

  async deleteATask(roomId: string, taskId: string) {
    const room = await this.roomsservice.getRoomDetails(roomId);

    if (!room) {
      throw new NotFoundException('This room does not exist');
    }

    const task = await this.taskRepository.findOne({
      where: { id: taskId, room: { id: roomId } },
    });

    if (!task) {
      throw new NotFoundException('Task does not exist');
    }

    this.taskRepository.softDelete(taskId);
  }

  async deleteMultipleTasks(
  roomId: string,
  taskIds: string[],
  userId: string,
) {
  if (!taskIds.length) {
    throw new BadRequestException('No task IDs provided');
  }

  const room = await this.roomRepository.findOne({
    where: { id: roomId, owner: { id: userId } },
  });

  if (!room) {
    throw new ForbiddenException(
      'Only owner can delete tasks in this room',
    );
  }

  const result = await this.taskRepository
    .createQueryBuilder()
    .softDelete()
    .where('id IN (:...taskIds)', { taskIds })
    .andWhere('roomId = :roomId', { roomId })
    .execute();

  return {
    deletedCount: result.affected,
  };
}
}
