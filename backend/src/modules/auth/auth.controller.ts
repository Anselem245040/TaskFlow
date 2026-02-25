import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import * as loginResponseDto from './dtos/login-response.dto';
import type {
  CreateUserDto,
  UsersService,
} from '../users/services/users.service';
import { UserStatus } from 'src/common/enums/status.enum';
import { Public } from './decorators/public.decorator';
import { SignUpDto } from './dtos/signup.dto';
import { ActiveUser } from './decorators/active-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as activeUserDataInterface from './interfaces/active-user-data.interface';

export class RegisterDto implements CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  status?: UserStatus;
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticate with email/password. Returns tokens and minimal user info. Use GET /me/organizations for full org list.',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Login',
        value: { email: 'user@example.com', password: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'eyJhbG...',
        refreshToken: 'eyJhbG...',
        user: { id: 'uuid', name: 'John Doe', email: 'user@example.com' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<loginResponseDto.LoginResponse> {
    // Placeholder for login logic
    return await this.authService.login(loginDto);
  }
  @Public()
  @Post('signup')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user with name, email, and password.',
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      example1: {
        summary: 'Create User',
        value: {
          name: 'John Doe',
          email: 'user@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: 'user.example.com',
        password: 'random-string',
      },
    },
  })
  async signup(
    @Body() signUpDto: SignUpDto,
  ): Promise<loginResponseDto.LoginResponse> {
    return await this.authService.signup(signUpDto);
  }

  /**
   * Refresh access token
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh tokens',
    description:
      'Exchange a valid refresh token for new access and refresh tokens',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { refreshToken: { type: 'string' } },
      required: ['refreshToken'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed',
    schema: {
      example: { accessToken: 'eyJhbG...', refreshToken: 'eyJhbG...' },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(
    @Body() body: loginResponseDto.RefreshTokenDto,
  ): Promise<loginResponseDto.RefreshTokenResponse> {
    return await this.authService.refreshTokens(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Deactivate Account',
    description: 'Deactivate the authenticated user account. This action is irreversible.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        accesstoken: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Account deactivated successfully',
  })
  @Delete('me')
  async deactivateMe(@ActiveUser() user: activeUserDataInterface.ActiveUserData): Promise<{ message: string }> {
    await this.authService.deleteUser(user.sub);
    return { message: 'Account deactivated' };
  }
}
