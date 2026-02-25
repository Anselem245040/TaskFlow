import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { UserStatus } from 'src/common/enums/status.enum';

export interface CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  status?: UserStatus;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  status?: UserStatus;
  lastLoginAt?: Date;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      status: createUserDto.status || UserStatus.ACTIVE,
    });

    return await this.userRepository.save(user);
  }

  async createWithQueryRunner(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const user = queryRunner.manager.create(User, {
      ...createUserDto,
      status: createUserDto.status || UserStatus.ACTIVE,
    });

    return await queryRunner.manager.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneWithRelations(
    findBy: FindOptionsWhere<User>,
    relations?: FindOptionsRelations<User>,
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: findBy,
      relations: relations || {},
    });
  }

  async findByEmail(
    email: string,
    relations?: FindOptionsRelations<User>,
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: relations || {},
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    Object.assign(user, updateUserDto);

    const savedUser = await this.userRepository.save(user);

    // this.eventEmitter.emit(CacheEvent.USER_UPDATED, { userId: id });

    return savedUser;
  }

  async updateLastLogin(id: string): Promise<User> {
    return await this.update(id, {
      lastLoginAt: new Date(),
    });
  }

  async deactivateMyAccount(userId: string): Promise<void> {
    // ✅ soft delete: sets deleted_at = NOW()
    await this.userRepository.softDelete(userId);
  }
}
