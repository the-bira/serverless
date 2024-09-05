import { APIGatewayProxyWebsocketEventV2 } from 'aws-lambda';

export const signup = (event: APIGatewayProxyWebsocketEventV2) => {
  console.log('event', event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
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