import { BaseEntity } from 'src/core/database/entities/base.entity';
import { TaskRoomMember } from 'src/modules/membership/entities/taskroommember.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  inviteCode: string;

  @ManyToOne(() => User, (user) => user.ownedRooms, { onDelete: 'CASCADE' })
  owner: User;

  @Index()
  @Column({ type: 'uuid' })
  ownerId: string;

  @OneToMany(() => TaskRoomMember, (m) => m.room)
  members: TaskRoomMember[];

}
