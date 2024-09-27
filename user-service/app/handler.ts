import { APIGatewayProxyEventV2, APIGatewayProxyWebsocketEventV2 } from 'aws-lambda';
import { HttpResponse } from './protocols/http';
import { RegisterUserDTO } from './dtos/user/register-user.dto';
import { badRequest, pageNotFound } from './protocols/errors';
import { instanceOfRegisterUser } from './instances/user/instance-register-user';

// export const signup = async (event: APIGatewayProxyEventV2): Promise<HttpResponse> => {
//   if (!event.body) {
//     return badRequest([{
//       property: 'body',
//       constraints: {
//         isRequired: 'Body is required'
//       }
//     }]);
//   }

//   const controller = instanceOfRegisterUser();
//   const registerUserData: RegisterUserDTO = JSON.parse(event.body);

//   const dto = Object.assign(new RegisterUserDTO(), registerUserData);

//   return await controller.handle(dto);
// };

// export const login = (event: APIGatewayProxyEventV2) => {
//   console.log('event', event);
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'Hello World' }),
//   };
// };

// export const verify = (event: APIGatewayProxyEventV2) => {
//   console.log('event', event);
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'Hello World' }),
//   };
// };

export const profile = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === 'GET') {
    const responseBody = { message: 'Hello World' };  // Atribui a resposta em uma variável
    console.log('Response Body:', responseBody);  // Loga o conteúdo da resposta

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseBody),  // Garante que o corpo seja convertido corretamente
    };
  } else if (httpMethod === 'POST') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello World' }),
    };
  } else if (httpMethod === 'PUT') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello World' }),
    }
  } else {
    return pageNotFound();
  }
};