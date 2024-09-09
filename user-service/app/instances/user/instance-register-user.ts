import { RegisterUserController } from '../../http/user/register-user.controller';
import { PrismaUserRepository } from '../../repositories/prisma-repositories/user.repo';
import { RegisterUserUseCase } from '../../use-cases/user/register-user';
import { BCryptPasswordEncryptor } from '../../utils/bcrypt-password-encryptor';
import { ResendMailer } from '../../utils/resend-mailer';
import { instanceOfPrismaService } from '../instance-prisma-service';

export const instanceOfRegisterUser = (): RegisterUserController => {

  const instanceOfPasswordEcryptor = new BCryptPasswordEncryptor();
  const instanceOfResendMailer = new ResendMailer();
  const instanceOfUserRepository = new PrismaUserRepository(instanceOfPrismaService());

  const instanceOfRegisterUserUseCase = new RegisterUserUseCase(
    instanceOfPasswordEcryptor,
    instanceOfUserRepository,
    instanceOfResendMailer
  );

  return new RegisterUserController( instanceOfRegisterUserUseCase );
}