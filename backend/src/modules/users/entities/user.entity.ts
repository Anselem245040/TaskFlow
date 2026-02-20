import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/common/enums/status.enum';
import { BaseEntity } from 'src/core/database/entities/base.entity';
import { TaskRoomMember } from 'src/modules/membership/entities/taskroommember.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { Entity, Column, Index, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordHash!: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  @Index()
  status!: UserStatus;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'last_login_at',
  })
  lastLoginAt?: Date;

  // Rooms this user owns
  @OneToMany(() => Room, (room) => room.owner)
  ownedRooms: Room[];

  // Memberships across rooms
  @OneToMany(() => TaskRoomMember, (m) => m.user)
  roomMemberships: TaskRoomMember[];
}
