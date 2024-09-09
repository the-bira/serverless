import { ValidationError } from 'class-validator';
import { HttpResponse } from './http';
import { HttpStatusCode } from './status-code.enum';

export const badRequest = (error: ValidationError[]): HttpResponse => {
  const messages = error.map((err) => {
    return {
      field: err.property,
      message: err.constraints || {},
    };
  });

  return {
    statusCode: HttpStatusCode.badRequest,
    body: JSON.stringify(messages),
  };
};

export const serverError = (): HttpResponse => {
  return {
    statusCode: HttpStatusCode.serverError,
    body: JSON.stringify({
      error: 'Internal server error',
    }),
  };
}