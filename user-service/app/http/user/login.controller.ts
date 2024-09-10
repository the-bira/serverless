import { ValidationError } from 'class-validator';
import { LoginDTO } from '../../dtos/user/login.dto';
import { serverError } from '../../protocols/errors';
import { HttpResponse } from '../../protocols/http';
import { HttpStatusCode } from '../../protocols/status-code.enum';
import { IController } from '../controller';

export class LoginController implements IController {
  constructor( private readonly loginUseCase: LoginUseCase) {}

  handle(dto: LoginDTO): Promise<HttpResponse> {
    try {

      const errors: ValidationError[] = await validate(dto);

      if (errors.length > 0) {
        return badRequest(errors);
      }

      const token = await this.loginUseCase.execute(dto);

      return {
        statusCode: HttpStatusCode.ok,
        body: JSON.stringify({ token }),
      };
      
    } catch (error) {
      return serverError();
    }

}