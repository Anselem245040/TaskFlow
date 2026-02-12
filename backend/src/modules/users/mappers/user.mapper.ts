import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserProfileResponse } from '../dtos/user-profile.dto';

@Injectable()
export class UserMapper {

    toProfileResponse(user: User): UserProfileResponse {
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status
            }
        }
    }
}
