import { APIGatewayProxyWebsocketEventV2 } from 'aws-lambda';
import { HttpResponse } from './protocols/http';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { badRequest } from './protocols/errors';
import { instanceOfRegisterUser } from './instances/user/instance-register-user';

export const signup = async (event: APIGatewayProxyWebsocketEventV2): Promise<HttpResponse> => {
  if (!event.body) {
    return badRequest([{
      property: 'body',
      constraints: {
        isRequired: 'Body is required'
      }
    }]);
  }

  const controller = instanceOfRegisterUser();
  const registerUserData: RegisterUserDTO = JSON.parse(event.body);

  const dto = Object.assign(new RegisterUserDTO(), registerUserData);

  return await controller.handle(dto);
};

export const login = (event: APIGatewayProxyWebsocketEventV2) => {
  console.log('event', event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};

export const verify = (event: APIGatewayProxyWebsocketEventV2) => {
  console.log('event', event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};

export const profile = (event: APIGatewayProxyWebsocketEventV2) => {
  console.log('event', event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};