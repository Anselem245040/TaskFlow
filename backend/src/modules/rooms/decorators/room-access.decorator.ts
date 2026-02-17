import { SetMetadata } from '@nestjs/common';

export type RoomAccessLevel = 'owner' | 'member';

export const ROOM_ACCESS_KEY = 'room_access';

export const RoomAccess = (level: RoomAccessLevel) =>
  SetMetadata(ROOM_ACCESS_KEY, level);
