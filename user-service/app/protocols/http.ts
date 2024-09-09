import { HttpStatusCode } from './status-code.enum';

export interface HttpResponse {
  statusCode: HttpStatusCode;
  body: any;
}