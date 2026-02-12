import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ModuleModule } from './module/rooms/module.module';
import { RoomModule } from './modules/rooms/room.module';
import { RoomsService } from './modules/room/services/rooms.service';
@Module({
  imports: [CoreModule, AuthModule, UsersModule, ModuleModule, RoomModule],
  controllers: [AppController],
  providers: [AppService, RoomsService],
})
export class AppModule {

}
