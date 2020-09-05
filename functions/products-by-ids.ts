import { Connection } from 'mongoose';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import Database from './SearchContext/database';
import HC from './utils/http-code';
import { CustomResponse } from './utils/CustomInterfaces';
import ProductValidations from './SearchContext/validators/ProductValidations';

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
    const body: EventBody = JSON.parse(event.body);

    const validator = await ProductValidations.getByIds(body);

    if (validator.error) {
      return {
        statusCode: HC.ERROR.BADREQUEST,
        body: JSON.stringify({
          error: validator.messages,
        }),
      };
    }

    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const products = await Products.find({
      isActive: true,
      _id: body.productIds,
    });

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ products }),
    };
  } catch (err) {
    console.log('CHEGOU AQUI', err);
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
