import { RegisterUserDTO } from '../dtos/register-user.dto';
import { User } from '../models/IUser';

export interface IUserRepository {
  register: (user: RegisterUserDTO) => Promise<User>;
}