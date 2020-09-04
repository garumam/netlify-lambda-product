import { Handler, Context } from 'aws-lambda';
import Database from './SearchContext/database';
import HC from './utils/http-code';
import { CustomResponse, CustomEvent } from './utils/CustomInterfaces';

interface ExpectedParams {
  id: string;
}

let conn = null;

const handler: Handler<CustomEvent<ExpectedParams>, CustomResponse> = async (
  event,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = event.queryStringParameters.id;

  if (event.httpMethod !== 'GET' || !id) {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

  try {
    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const product = await Products.findById(id);

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ product }),
    };
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
