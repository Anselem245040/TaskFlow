import { UserStatus } from 'src/common/enums/status.enum';

export interface UserProfileDto {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}
