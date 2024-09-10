import { RegisterUserDTO } from '../dtos/user/register-user.dto';
import { User } from '../models/IUser';

export interface IUserRepository {
  register: (user: RegisterUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}