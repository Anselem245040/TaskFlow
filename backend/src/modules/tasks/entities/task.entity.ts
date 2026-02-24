import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @Index()
  status!: TaskStatus;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dueDate?: Date;

  @ManyToOne(() => Room, (room) => room.tasks, { onDelete: 'CASCADE' })
  room: Room;

  @ManyToOne(() => User, (user) => user.createdTasks, { onDelete: 'SET NULL' , nullable: false})
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { onDelete: 'SET NULL', nullable: true })
  assignedTo?: User;


  
}
