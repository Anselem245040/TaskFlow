import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token.interface';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from '../decorators/active-user.decorator';
import { UsersService } from 'src/modules/users/services/users.service';

export interface JwtPayload extends TokenPayload {
  iat?: number;
  exp?: number;
}

/**
 * JWT Strategy
 *
 * Validates JWT tokens and extracts user information
 * Used by JwtAuthGuard to protect routes
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
      issuer: configService.get<string>('jwt.issuer'),
      audience: configService.get<string>('jwt.audience'),
    });
  }

  /**
   * Validates the JWT payload
   * This method is called after the JWT is verified
   *
   * @param payload - The decoded JWT payload
   * @returns User information to be attached to request.user
   */
  async validate(payload: JwtPayload): Promise<CurrentUser> {
    if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid token payload');
  }

  const currentUser = this.userService.findById(payload.sub);
  if (!currentUser) {
    throw new UnauthorizedException('User Not Found')
  }

  return currentUser

}
}
