import { RegisterUserController } from "../../http/user/register-user.controller";
import { PrismaUserRepository } from "../../repositories/prisma-repositories/user.repo";
import { RegisterUserUseCase } from "../../use-cases/user/register-user";
import { CognitoAuth } from "../../utils/cognito-auth";
import { ResendMailer } from "../../utils/resend-mailer";
import { instanceOfPrismaService } from "../instance-prisma-service";

export const instanceOfRegisterUser = (): RegisterUserController => {
  const instanceOfAuthProvider = new CognitoAuth();
  const instanceOfResendMailer = new ResendMailer();
  const instanceOfUserRepository = new PrismaUserRepository(
    instanceOfPrismaService()
  );

  const instanceOfRegisterUserUseCase = new RegisterUserUseCase(
    instanceOfAuthProvider,
    instanceOfUserRepository,
    instanceOfResendMailer
  );

  return new RegisterUserController(instanceOfRegisterUserUseCase);
};
