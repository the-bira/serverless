import { RegisterUserDTO } from '../../dtos/user/register-user.dto';
import { User } from '../../models/IUser';
import { IMailer } from '../../providers/mailer';
import { IPasswordEncryptor } from '../../providers/password-encryptor';
import { ISalt } from '../../providers/salt';
import { IUserRepository } from '../../repositories/user.repo';

export class RegisterUserUseCase {

  constructor(
    private readonly passwordEncryptor: IPasswordEncryptor,
    private readonly genSalt: ISalt,
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailer,
  ) {}

  async execute(registerUserDto: RegisterUserDTO): Promise<User> {
    const salt = await this.genSalt.generateSalt();
    const hashedPassword = await this.passwordEncryptor.encrypt(registerUserDto.password, salt);
    registerUserDto.password = hashedPassword;
    registerUserDto.salt = salt;

    const user = this.userRepository.register(registerUserDto);
    this.mailer.sendMail(registerUserDto.email, 'Welcome message', 'Welcome to our platform');

    return user;
  }
}