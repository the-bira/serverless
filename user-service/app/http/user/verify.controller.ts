import { ValidationError, validate } from "class-validator";
import { badRequest, serverError } from "../../protocols/errors";
import { HttpResponse } from "../../protocols/http";
import { HttpStatusCode } from "../../protocols/status-code.enum";
import { IController } from "../controller";

export class VerifyController implements IController {
  constructor(private readonly verifyUseCase: VerifyUseCase) {}

  async handle(dto: VerifyDTO): Promise<HttpResponse> {
    try {
      const errors: ValidationError[] = await validate(dto);

      if (errors.length > 0) {
        return badRequest(errors);
      }

      const token = await this.verifyUseCase.execute(dto);

      return {
        statusCode: HttpStatusCode.ok,
        body: JSON.stringify({ token }),
      };
    } catch (error) {
      return serverError();
    }
  }
}