import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UsersService } from '../users/services/users.service';
import { User } from '../users/entities/user.entity';
import { LoginResponse, RefreshTokenResponse } from './dtos/login-response.dto';
import { AuthTokens, TokenPayload } from './interfaces/token.interface';
import { UserStatus } from 'src/common/enums/status.enum';
import { SignUpDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    // Implement login logic here
    const { email, password } = loginDto;
    // Validate user credentials, generate tokens, etc.
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User is not active');
    }

    // Validate password
    await this.validateCredentials(password, user.passwordHash);

    // Update last login timestamp
    await this.usersService.updateLastLogin(user.id);

    //Generate Tokens
    const tokenPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const tokens = await this.generateTokens(tokenPayload);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async signup(signUpDto: SignUpDto): Promise<LoginResponse> {
    const { email, password } = signUpDto;

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
    const hashedPassword = await this.hashPassword(signUpDto.password);
    const user = await this.usersService.create({
      ...signUpDto,
      passwordHash: hashedPassword,
    });

    const tokenPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const tokens = await this.generateTokens(tokenPayload);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  /**
   * Hash a password using bcrypt
   *
   * @param password - Plain text password
   * @returns Hashed password
   */
  async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.get<number>('app.bcryptRounds');
    console.log('Password:', password);
    console.log('Rounds:', rounds);
    return bcrypt.hash(password, rounds);
  }

  /**
   * Generate access and refresh tokens
   *
   * @param payload - Token payload containing user info
   * @returns Access and refresh tokens
   */

  async generateTokens(payload: TokenPayload): Promise<AuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.refreshSecret'),
        expiresIn: this.configService.get('jwt.refreshExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Validate user credentials
   *
   * @param password - Plain text password
   * @param hashedPassword - Hashed password from database
   * @returns True if valid, throws UnauthorizedException otherwise
   */
  async validateCredentials(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isValid = await this.comparePasswords(password, hashedPassword);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }

  /**
   * Compare a plain text password with a hashed password
   *
   * @param password - Plain text password
   * @param hashedPassword - Hashed password
   * @returns True if passwords match
   */
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshTokens(refreshToken: string): Promise<RefreshTokenResponse> {
    const payload = await this.verifyRefreshToken(refreshToken);

    // Verify user still exists and is active
    const user = await this.usersService.findByEmail(payload.email);
    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User not found or inactive');
    }

    const tokens = await this.generateTokens(payload);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Verify and decode a refresh token
   *
   * @param token - Refresh token to verify
   * @returns Decoded token payload
   */
  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      return {
        sub: payload.sub,
        email: payload.email,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    await this.usersService.deactivateMyAccount(userId);
    return { message: 'Account deactivated' };
  }
}
