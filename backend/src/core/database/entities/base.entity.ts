import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn
} from 'typeorm';

/**
 * BaseEntity
 *
 * Abstract base class for all entities in the system.
 * Provides common fields that should be present in every table:
 * - UUID primary key
 * - Timestamps (created, updated, deleted)
 * - Optimistic locking version
 *
 * Usage:
 * ```typescript
 * @Entity('users')
 * export class User extends BaseEntity {
 *   @Column()
 *   name: string;
 * }
 * ```
 */
export abstract class BaseEntity {
  /**
   * Unique identifier (UUID v4)
   */
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * Timestamp when the record was created
   */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'LOCALTIMESTAMP'
  })
  @Exclude()
  createdAt!: Date;

  /**
   * Timestamp when the record was last updated
   */
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'LOCALTIMESTAMP'
  })
  @Exclude()
  updatedAt!: Date;

  /**
   * Soft delete timestamp
   * When set, the record is considered deleted but remains in the database
   */
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true
  })
  @Exclude()
  deletedAt?: Date;

  /**
   * Version number for optimistic locking
   * Automatically incremented on each update
   */
  @VersionColumn({
    name: 'version',
    default: 1
  })
  @Exclude()
  version!: number;
}
