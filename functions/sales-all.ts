import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import Database from './SaleContext/database';
import HC from './utils/http-code';
import Sale from './SaleContext/models/Sale';
import { CustomResponse } from './utils/CustomInterfaces';

let conn = null;

const handler: Handler<APIGatewayEvent, CustomResponse> = async (
  event,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

  try {
    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const sales = await Sale.findAll();

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ sales }),
    };
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
