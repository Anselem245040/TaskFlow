import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { ActiveUser } from 'src/modules/auth/decorators/active-user.decorator';
import { RoomAccessGuard } from '../guards/room-access.guard';
import { RoomAccess } from '../decorators/room-access.decorator';


@Controller('rooms')
@ApiTags('Rooms')
@UseGuards(JwtAuthGuard, RoomAccessGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  // Only room owner can create sub-rooms
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({
    summary: 'Room has been successfully ccreated',
    description: 'Allow for creating rooms and inviting participants',
  })
  @ApiBody({
    type: CreateRoomDto,
    examples: {
      example1: {
        summary: 'Create Room',
        value: {
          name: 'Project Alpha',
          description: 'A room for Project Alpha discussions',
          participants: [''],
        },
      },
    },
  })
  public async createRoom(
    @ActiveUser() user: { id: string },
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomsService.createRoom(user.id, createRoomDto);
  }

  @ApiOperation({
    summary: 'Get Room Details',
    description: 'Returns room details including participants and sub-rooms',
  })
  @ApiBody({
    schema: {
      example: {
        roomId: 'uuid',
        name: 'Project Alpha',
        inviteCode: 'ABCD1234',
        ownerId: 'uuid',
        members: [
          {
            userId: 'uuid',
            name: 'John Doe',
            email: 'user@example.com',
            status: 'ACCEPTED',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Room details retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':roomId')
  public async getRoomDetails(@Param('roomId') roomId: string) {
    return this.roomsService.getRoomDetails(roomId);
  }

  @ApiOperation({
    summary: 'Get User Rooms',
    description: 'Returns a list of rooms the user is a member of',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User rooms retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':userId/rooms')
  public async getUserRooms(@ActiveUser() user: { id: string }) {
    return this.roomsService.getRoomsForUser(user.id);
  }

  @ApiOperation({
    summary: 'Invite User to Room',
    description: 'Invite a user to join a room by email',
  })
  @ApiBody({
    schema: {
      example: {
        inviteCode: 'ABCD1234',
        email: 'log@example.com',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User invited successfully',
  })
  @HttpCode(HttpStatus.OK)
  @RoomAccess('owner') // Only room owner can invite
  @Post(':roomId/invite')
  async inviteUserToRoom(
    @Param('roomId') roomId: string,
    @ActiveUser() user: { id: string },
    @Body('email') email: string,
  ) {
    return this.roomsService.inviteUserToRoomByEmail(roomId, user.id, email);
  }

  @ApiOperation({
    summary: 'Accept Room Invitation',
    description: 'Accept an invitation to join a room using the invite code',
  })
  @ApiBody({
    schema: {
      example: {
        inviteCode: 'ABCD1234',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invitation accepted successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Post(':roomId/accept-invite')
  @Post(':roomId/accept-invite')
async acceptRoomInvitation(
  @ActiveUser() user: { id: string },
  @Param('roomId') roomId: string,
  @Body('inviteCode') inviteCode: string,
) {
  return this.roomsService.acceptAndJoin(roomId, user.id, inviteCode);
}


  @ApiOperation({
    summary: 'Decline Room Invitation',
    description: 'Decline an invitation to join a room using the invite code',
  })
  @ApiBody({
    schema: {
      example: {
        inviteCode: 'ABCD1234',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Invitation declined successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Post(':roomId/decline-invite')
  async declineRoomInvitation(
    @ActiveUser() user: { id: string },
    @Param('roomId') roomId: string,
  ) {
    return this.roomsService.declineRoomInvitation(roomId, user.id);
  }

  @ApiOperation({
    summary: 'Get room participants',
    description: 'Get a list of participants in the room',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Room participants retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':roomId/participants')
  async getRoomParticipants(
    @ActiveUser() user: { id: string },
    @Param('roomId') roomId: string,
  ) {
    return this.roomsService.getRoomParticipants(roomId, user.id);
  }

  @ApiOperation({
    summary: 'remvove member from a task-room',
    description:
      'Remove a member from the task-room. Only owner can remove members.',
  })
  @ApiBody({
    schema: {
      example: {
        userId: 'uuid',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @RoomAccess('owner')
  @Delete(':roomId/members/:userId')
  async removeMemberFromRoom(
    @ActiveUser() user: { id: string },
    @Param('roomId') roomId: string,
    @Param('userId') userId: string,
  ) {
    return this.roomsService.removeMember(roomId, user.id, userId);
  }

  @ApiOperation({
    summary: 'Leave a room',
    description:
      'Allows a member to leave a room. Owners cannot leave their own rooms.',
  })
  @ApiBody({
    schema: {
      example: {
        roomId: 'uuid',
        userId: 'uuid',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Left the room successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':roomId/leave')
  async leaveRoom(
    @ActiveUser() user: { id: string },
    @Param('roomId') roomId: string,
  ) {
    return this.roomsService.leaveRoom(roomId, user.id);
  }

  @Patch(':roomId/transfer-ownership')
  @RoomAccess('owner') // ensures only owner can call it (via RoomAccessGuard)
  @ApiOperation({
    summary: 'Transfer room ownership',
    description:
      'Allows the current owner to transfer ownership to another accepted member',
  })
  @ApiBody({
    schema: {
      example: {
        newOwnerId: 'uuid-of-new-owner',
      },
    },
  })
  async transferOwnership(
    @Param('roomId') roomId: string,
    @ActiveUser() user: { id: string },
    @Body('newOwnerId') newOwnerId: string,
  ) {
    return this.roomsService.transferOwnership(roomId, user.id, newOwnerId);
  }
}
