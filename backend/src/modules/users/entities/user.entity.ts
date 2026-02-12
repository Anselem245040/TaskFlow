import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/common/enums/status.enum';
import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

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
}
