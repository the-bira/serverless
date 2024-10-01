import { RegisterUserDTO } from '../../dtos/user/register-user.dto';
import { User } from '../../models/IUser';
import { IAccessManager } from '../../providers/access-manager';
import { IMailer } from '../../providers/mailer';
import { IPasswordEncryptor } from '../../providers/password-encryptor';
import { ISalt } from '../../providers/salt';
import { IUserRepository } from '../../repositories/user.repo';

export class RegisterUserUseCase {

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailer,
    private readonly accessManager: IAccessManager, 
  ) {}

  async execute(registerUserDto: RegisterUserDTO): Promise<User> {

    const user = this.userRepository.register(registerUserDto);
    this.mailer.sendMail(registerUserDto.email, 'Welcome message', 'Welcome to our platform');

    return user;
  }
}