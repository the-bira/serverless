import { RegisterUserDTO } from "../../dtos/user/register-user.dto";
import { User } from "../../models/IUser";
import { IAuthProvider } from "../../providers/auth";
import { IMailer } from "../../providers/mailer";
import { IPasswordEncryptor } from "../../providers/password-encryptor";
import { ISalt } from "../../providers/salt";
import { IUserRepository } from "../../repositories/user.repo";

export class RegisterUserUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailer
  ) {}

  async execute(registerUserDto: RegisterUserDTO): Promise<User> {
    const signUpUser = await this.authProvider.register(
      registerUserDto.email,
      registerUserDto.password!,
      registerUserDto.phone
    );

    const user = this.userRepository.register({
      email: registerUserDto.email,
      phone: registerUserDto.phone,
      cognitoId: signUpUser.id,
    });

    this.mailer.sendMail(
      registerUserDto.email,
      "Welcome message",
      "Welcome to our platform"
    );

    return user;
  }
}
