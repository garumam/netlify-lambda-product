import { Connection } from 'mongoose';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import Database from './SearchContext/database';
import HC from './utils/http-code';
import { CustomResponse } from './utils/CustomInterfaces';

interface EventBody {
  productIds: string[];
}

let conn: Connection | null = null;

const handler: Handler<APIGatewayEvent, CustomResponse> = async (
  event,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

  try {
    const { productIds }: EventBody = JSON.parse(event.body);

    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const products = await Products.find({
      isActive: true,
      _id: productIds,
    });

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ products }),
    };
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
