import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity';

import { randomBytes } from 'crypto';
import { FindOptionsRelations } from 'typeorm';
import {
  RoomMemberRole,
  RoomMemberStatus,
  TaskRoomMember,
} from '../../membership/entities/taskroommember.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from 'src/modules/users/services/users.service';

const invitecode = (length: number = 8): string => {
  return randomBytes(length).toString('base64url').slice(0, length);
};

export class UpdateRoomDto {
  name?: string;
}
@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(TaskRoomMember)
    private readonly taskRoomMemberRepository: Repository<TaskRoomMember>,
    private readonly dataSource: DataSource,
    private readonly userService: UsersService,
  ) {}

  public async createRoom(ownerId: string, createRoomDto: CreateRoomDto) {
    return this.dataSource.transaction(async (manager) => {
      const roomRepo = manager.getRepository(Room);
      const memberRepo = manager.getRepository(TaskRoomMember);

      const room = roomRepo.create({
        name: createRoomDto.name,
        ownerId,
        inviteCode: invitecode(),
      });

      const savedRoom = await roomRepo.save(room);

      const ownerMembership = memberRepo.create({
        taskRoomId: savedRoom.id,
        userId: ownerId,
        role: RoomMemberRole.OWNER,
        status: RoomMemberStatus.ACCEPTED,
        acceptedAt: new Date(),
        invitedByUserId: null,
      });

      await memberRepo.save(ownerMembership);

      return savedRoom;
    });
  }

  public async updateRoom(roomId: string, updateRoomDto: UpdateRoomDto) {
    // Logic for updating room details
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    Object.assign(room, updateRoomDto);
    const updatedRoom = await this.roomRepository.save(room);
    return { message: 'Room updated successfully', room: updatedRoom };
  }

  public async deleteRoom(roomId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }
    await this.roomRepository.remove(room);
    return { message: 'Room deleted successfully' };
  }

  public async getRoomsForUser(
    userId: string,
    relations?: FindOptionsRelations<Room>,
  ): Promise<Room[]> {
    // Logic for fetching rooms a user is part of
    return this.roomRepository.find({
      where: [
        { ownerId: userId },
        { members: { userId } }, // this assumes TaskRoomMember has a userId column
      ],
      relations: relations ?? {},
    });
  }

  public async getRoomDetails(roomId: string): Promise<Room> {
    // Logic for fetching room details, including participants
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['members', 'tasks'], // assuming TaskRoomMember has a user relation
    });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  public async inviteUserToRoomByEmail(
    roomId: string,
    inviterId: string,
    email: string,
  ) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found');

    if (room.ownerId !== inviterId) {
      throw new ForbiddenException('Only room owner can invite users');
    }

    // ✅ lookup invitee by email (you need a UserRepository / UsersService)
    const invitee = await this.userService.findByEmail(email);
    if (!invitee) throw new NotFoundException('User not found');

    // ensure inviteCode exists
    if (!room.inviteCode) {
      room.inviteCode = invitecode();
      await this.roomRepository.save(room);
    }

    const existing = await this.taskRoomMemberRepository.findOne({
      where: { taskRoomId: roomId, userId: invitee.id },
    });

    if (existing) {
      if (existing.status === RoomMemberStatus.ACCEPTED) {
        throw new ConflictException('User is already a member of this room');
      }

      existing.status = RoomMemberStatus.PENDING;
      existing.invitedByUserId = inviterId;
      existing.declinedAt = null;
      existing.acceptedAt = null;

      await this.taskRoomMemberRepository.save(existing);

      return {
        inviteLink: `https://yourapp.com/rooms/join/${room.inviteCode}`,
      };
    }

    const invitation = this.taskRoomMemberRepository.create({
      taskRoomId: roomId,
      userId: invitee.id,
      invitedByUserId: inviterId,
      role: RoomMemberRole.PARTICIPANT,
      status: RoomMemberStatus.PENDING,
    });

    await this.taskRoomMemberRepository.save(invitation);

    return { inviteLink: `https://yourapp.com/rooms/join/${room.inviteCode}` };
  }

  public async acceptAndJoin(
    roomId: string,
    userId: string,
    inviteCode: string,
  ) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      select: ['id', 'inviteCode'],
    });

    if (!room) throw new NotFoundException('Room not found');

    if (!room.inviteCode || room.inviteCode !== inviteCode) {
      throw new NotFoundException('Invalid invite code');
    }

    const membership = await this.taskRoomMemberRepository.findOne({
      where: { taskRoomId: roomId, userId },
    });

    if (!membership) {
      throw new NotFoundException('No invitation found for this user');
    }

    if (membership.status === RoomMemberStatus.ACCEPTED) {
      return { message: 'Already a member' };
    }

    membership.status = RoomMemberStatus.ACCEPTED;
    membership.acceptedAt = new Date();
    membership.declinedAt = null;

    await this.taskRoomMemberRepository.save(membership);

    return { message: 'Invitation accepted successfully' };
  }

  public async declineRoomInvitation(roomId: string, userId: string) {
    const membership = await this.taskRoomMemberRepository.findOne({
      where: { taskRoomId: roomId, userId },
    });

    if (!membership) {
      throw new NotFoundException('Invitation not found');
    }

    if (membership.status === RoomMemberStatus.ACCEPTED) {
      throw new ConflictException('You are already a member of this room');
    }

    if (membership.status === RoomMemberStatus.DECLINED) {
      return { message: 'Invitation already declined' };
    }

    membership.status = RoomMemberStatus.DECLINED;
    membership.declinedAt = new Date();
    membership.acceptedAt = null;

    await this.taskRoomMemberRepository.save(membership);

    return { message: 'Invitation declined successfully' };
  }

  public async getRoomParticipants(roomId: string, requesterId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      select: ['id', 'ownerId'],
    });

    if (!room) throw new NotFoundException('Room not found');

    // Owner can see everybody
    if (room.ownerId === requesterId) {
      return this.taskRoomMemberRepository.find({
        where: { taskRoomId: roomId },
        select: [
          'userId',
          'role',
          'status',
          'invitedByUserId',
          'acceptedAt',
          'declinedAt',
        ],
        order: { createdAt: 'ASC' }, // only if BaseEntity has createdAt
      });
    }

    // If not owner, must be an ACCEPTED member to view participants
    const requesterMembership = await this.taskRoomMemberRepository.findOne({
      where: { taskRoomId: roomId, userId: requesterId },
      select: ['id', 'status'],
    });

    if (
      !requesterMembership ||
      requesterMembership.status !== RoomMemberStatus.ACCEPTED
    ) {
      throw new ForbiddenException('You are not allowed to view participants');
    }

    // Accepted members can see accepted participants only
    return this.taskRoomMemberRepository.find({
      where: { taskRoomId: roomId, status: RoomMemberStatus.ACCEPTED },
      select: ['userId', 'role', 'status', 'invitedByUserId', 'acceptedAt'],
      order: { createdAt: 'ASC' },
    });
  }

  public async removeMember(roomId: string, ownerId: string, memberId: string) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found');

    if (room.ownerId !== ownerId) {
      throw new ForbiddenException('Only owner can remove members');
    }

    const membership = await this.taskRoomMemberRepository.findOne({
      where: { taskRoomId: roomId, userId: memberId },
    });

    if (!membership) {
      throw new NotFoundException('Member not found');
    }

    await this.taskRoomMemberRepository.remove(membership);

    return { message: 'Member removed successfully' };
  }

  public async leaveRoom(roomId: string, userId: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      select: ['id', 'ownerId'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // 🚫 Owner cannot leave directly
    if (room.ownerId === userId) {
      throw new ConflictException(
        'Owner cannot leave the room. Transfer ownership first.',
      );
    }

    const membership = await this.taskRoomMemberRepository.findOne({
      where: { taskRoomId: roomId, userId },
    });

    if (!membership) {
      throw new NotFoundException('You are not a member of this room');
    }

    // If user never accepted, just delete invitation
    if (membership.status === RoomMemberStatus.PENDING) {
      await this.taskRoomMemberRepository.remove(membership);
      return { message: 'Invitation cancelled' };
    }

    // If accepted member → remove from room
    if (membership.status === RoomMemberStatus.ACCEPTED) {
      await this.taskRoomMemberRepository.remove(membership);
      return { message: 'Left room successfully' };
    }

    // If declined → nothing to leave
    if (membership.status === RoomMemberStatus.DECLINED) {
      throw new ConflictException('You are not an active member of this room');
    }
  }

  public async transferOwnership(
    roomId: string,
    currentOwnerId: string,
    newOwnerId: string,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const roomRepo = manager.getRepository(Room);
      const memberRepo = manager.getRepository(TaskRoomMember);

      const room = await roomRepo.findOne({
        where: { id: roomId },
        select: ['id', 'ownerId'],
      });

      if (!room) {
        throw new NotFoundException('Room not found');
      }

      if (room.ownerId !== currentOwnerId) {
        throw new ForbiddenException(
          'Only current owner can transfer ownership',
        );
      }

      if (newOwnerId === currentOwnerId) {
        throw new ConflictException('You are already the owner');
      }

      const newOwnerMembership = await memberRepo.findOne({
        where: {
          taskRoomId: roomId,
          userId: newOwnerId,
          status: RoomMemberStatus.ACCEPTED,
        },
      });

      if (!newOwnerMembership) {
        throw new ConflictException(
          'New owner must be an accepted member of the room',
        );
      }

      const oldOwnerMembership = await memberRepo.findOne({
        where: {
          taskRoomId: roomId,
          userId: currentOwnerId,
        },
      });

      // Update room owner
      room.ownerId = newOwnerId;
      await roomRepo.save(room);

      // Update roles
      if (oldOwnerMembership) {
        oldOwnerMembership.role = RoomMemberRole.PARTICIPANT;
        await memberRepo.save(oldOwnerMembership);
      }

      newOwnerMembership.role = RoomMemberRole.OWNER;
      await memberRepo.save(newOwnerMembership);

      return { message: 'Ownership transferred successfully' };
    });
  }
}
