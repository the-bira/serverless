import { RegisterUserDTO } from '../../dtos/register-user.dto';
import { User } from '../../models/IUser';
import { badRequest, serverError } from '../../protocols/errors';
import { HttpResponse } from '../../protocols/http';
import { HttpStatusCode } from '../../protocols/status-code.enum';
import { RegisterUserUseCase } from '../../use-cases/user/register-user';
import { IController } from '../controller';
import { validate, ValidationError } from 'class-validator';

export class RegisterUserController implements IController {

  constructor (private readonly registerUserUseCase: RegisterUserUseCase) {}

  async handle(registerUserData: RegisterUserDTO) : Promise<HttpResponse> {

    console.log('registerUserData controller', registerUserData instanceof RegisterUserDTO);

    try{
      const errors: ValidationError[] = await validate(registerUserData);
      console.log('errors', errors);

      if (errors.length > 0 ) {
        return badRequest(errors);
      }

      const passwordNotMatches = registerUserData.password !== registerUserData.confirmPassword;

      if (passwordNotMatches) {
        return badRequest([{
          property: 'password',
          constraints: {
            notMatches: 'Password does not match'
          }
        }]);
      }

      const user: User = await this.registerUserUseCase.execute(registerUserData);

      console.log('user', user);

      return {
        statusCode: HttpStatusCode.ok,
        body: JSON.stringify(user),
      };
    } catch (error) {
      return serverError();
    }
  }
}