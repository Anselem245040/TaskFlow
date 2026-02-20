import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomModule } from './modules/rooms/room.module';
import { TaskroommemberModule } from './modules/membership/modules/taskroommember.module';
@Module({
  imports: [CoreModule, AuthModule, UsersModule, RoomModule, TaskroommemberModule],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {

}
