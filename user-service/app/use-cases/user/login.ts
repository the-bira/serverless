import { LoginDTO } from '../../dtos/user/login.dto';
import { IUserRepository } from '../../repositories/user.repo';
import { validatePassword } from '../../utils/validate-password';

export class LoginUseCase {
  constructor(
    private readonly userRepositoty: IUserRepository
  ) {}


  async execute(dto: LoginDTO): Promise<string> {

    const user = await this.userRepositoty.findByEmail(dto.email);

    if (!user) {
      throw new Error('User not found');
    } else if (user.password && user.salt) 
      await validatePassword(dto.password, user.password, user.salt);
    else throw new Error('User not found');

    return 'token';
  }
}