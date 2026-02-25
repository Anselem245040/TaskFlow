import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRoomMember } from '../entities/taskroommember.entity';
import { TaskroommemberController } from '../controllers/taskroommember.controller';
import { TaskroommemberService } from '../services/taskroommember.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRoomMember])],
    controllers: [TaskroommemberController],
    providers: [TaskroommemberService],
    exports: [TaskroommemberService, TaskroommemberModule],
})
export class TaskroommemberModule {
    
}
