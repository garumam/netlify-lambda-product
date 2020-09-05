import { APIGatewayEvent } from 'aws-lambda';

export interface CustomResponse {
  statusCode: number;
  body: string;
}

export interface CustomEvent<Params extends {}> extends APIGatewayEvent {
  queryStringParameters: Params;
}
