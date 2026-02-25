import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TaskRoomMember } from 'src/modules/membership/entities/taskroommember.entity';
import { TaskService } from '../services/task.service';
import { TaskController } from '../controllers/task.controller';
import { RoomsService } from 'src/modules/rooms/services/rooms.service';
import { UsersService } from 'src/modules/users/services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity, Room, User, TaskRoomMember])],
    providers: [TaskService, RoomsService, UsersService],
    controllers: [TaskController],
    exports: [TypeOrmModule, TaskService],
})
export class TaskModule {
}
