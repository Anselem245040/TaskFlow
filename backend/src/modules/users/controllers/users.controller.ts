import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as usersService from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import type { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';
import { ActiveUser } from '../../auth/decorators/active-user.decorator';
import { UserProfileResponse } from '../dtos/user-profile.dto';
import { UserMapper } from '../mappers/user.mapper';

@Controller('users')
@ApiBearerAuth('JWT')
@ApiTags('User Profile')
export class UsersController {
  constructor(
    private readonly userService: usersService.UsersService,
    private readonly userMapper: UserMapper,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get Current User',
    description: 'Returns minimal user profile',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current user profile retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'ACTIVE'
      },
    },
  })
  async getCurrentUser(
    @ActiveUser() currentuser: ActiveUserData,
  ): Promise<UserProfileResponse> {
    const user = await this.userService.findById(currentuser.sub);
    return this.userMapper.toProfileResponse(user);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @Post()
  public createUser(@Body() createUserDto: usersService.CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully updated.',
  })
  @Patch('me')
  async updateUser(
    @ActiveUser() user: ActiveUserData,
    @Body() updateUserDto: usersService.UpdateUserDto,
  ): Promise<UserProfileResponse> {
    const updatedUser = await this.userService.update(user.sub, updateUserDto);
    return this.userMapper.toProfileResponse(updatedUser);
  }
}
