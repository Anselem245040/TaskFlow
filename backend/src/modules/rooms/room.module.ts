import { Module } from '@nestjs/common';
import { RoomsController } from './controller/rooms.controller';
import { RoomsService } from './services/rooms.service';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRoomMember } from '../membership/entities/taskroommember.entity';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, TaskRoomMember, User])],
  controllers: [RoomsController],
  providers: [RoomsService, UsersService],
  exports: [RoomsService],
})
export class RoomModule {}
