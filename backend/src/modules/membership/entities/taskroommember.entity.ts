import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique} from 'typeorm';

export enum RoomMemberRole {
  OWNER = 'owner',
  PARTICIPANT = 'participant',
}

export enum RoomMemberStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}
@Unique('uq_room_user', ['taskRoomId', 'userId']) // prevents same user joining twice
@Index('idx_room_status', ['taskRoomId', 'status'])
@Entity('task-room-members')
export class TaskRoomMember extends BaseEntity {
  // ---- Relations ----
  @ManyToOne(() => Room, (room) => room.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskRoomId' })
  room: Room;

  @Column({ type: 'uuid' })
  taskRoomId: string;

  @ManyToOne(() => User, (user) => user.roomMemberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  // Who invited this member (usually the owner)
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'invitedByUserId' })
  invitedBy?: User | null;

  @Column({ type: 'uuid', nullable: true })
  invitedByUserId?: string | null;

  // ---- Membership details ----
  @Column({
    type: 'enum',
    enum: RoomMemberRole,
    default: RoomMemberRole.PARTICIPANT,
  })
  role: RoomMemberRole;

  @Column({
    type: 'enum',
    enum: RoomMemberStatus,
    default: RoomMemberStatus.PENDING,
  })
  status: RoomMemberStatus;

  // When they accepted (or declined). Keep both fields optional.
  @Column({ type: 'timestamptz', nullable: true })
  acceptedAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  declinedAt?: Date | null;
}
