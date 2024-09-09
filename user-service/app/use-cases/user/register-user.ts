import { RegisterUserDTO } from '../../dtos/register-user.dto';
import { User } from '../../models/IUser';
import { IMailer } from '../../providers/mailer';
import { IPasswordEncryptor } from '../../providers/password-encryptor';
import { IUserRepository } from '../../repositories/user.repo';

export class RegisterUserUseCase {

  constructor(
    private readonly passwordEncryptor: IPasswordEncryptor,
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailer,
  ) {}

  async execute(registerUserDto: RegisterUserDTO): Promise<User> {
    const hashedPassword = await this.passwordEncryptor.encrypt(registerUserDto.password);
    registerUserDto.password = hashedPassword;

    const user = this.userRepository.register(registerUserDto);
    this.mailer.sendMail(registerUserDto.email, 'Welcome message', 'Welcome to our platform');

    return user;
  }
}