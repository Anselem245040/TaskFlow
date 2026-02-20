import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Room } from '../entities/room.entity';
import { TaskRoomMember } from 'src/modules/membership/entities/taskroommember.entity';
import { RoomMemberStatus } from '../enums/task-room.enum';
import { ROOM_ACCESS_KEY, RoomAccessLevel } from '../decorators/room-access.decorator';

@Injectable()
export class RoomAccessGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    @InjectRepository(Room)
    private readonly roomRepository,
    @InjectRepository(TaskRoomMember)
    private readonly memberRepository

  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const userId: string | undefined = req.user?.id;
    if (!userId) throw new ForbiddenException('Unauthorized');

    const required = this.reflector.getAllAndOverride<RoomAccessLevel>(
      ROOM_ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no metadata, do nothing (allow)
    if (!required) return true;
    
    const roomId: string | undefined =
      req.params?.roomId ?? req.body?.roomId ?? req.query?.roomId;

    if (!roomId) throw new NotFoundException('roomId is required');

    

    // Load room ownerId only
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      select: ['id', 'ownerId'],
    });

    if (!room) throw new NotFoundException('Room not found');

    // Owner-only routes
    if (required === 'owner') {
      if (room.ownerId !== userId) {
        throw new ForbiddenException('Only room owner can perform this action');
      }
      return true;
    }

    // Member routes: owner OR ACCEPTED member
    if (room.ownerId === userId) return true;

    const membership = await this.memberRepository.findOne({
      where: { taskRoomId: roomId, userId },
      select: ['id', 'status'],
    });

    if (!membership || membership.status !== RoomMemberStatus.ACCEPTED) {
      throw new ForbiddenException('You are not allowed in this room');
    }

    return true;
  }
}
