import mongoose from 'mongoose';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import Database from './SearchContext/database';
import HC from './utils/http-code';
import { CustomResponse, ProductParams } from './utils/CustomInterfaces';

interface EventBody extends ProductParams {}

let conn: mongoose.Connection | null = null;

const handler: Handler<APIGatewayEvent, CustomResponse> = async (
  event,
  context: Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

  try {
    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const body: EventBody = JSON.parse(event.body);

    const Products = conn.model('Products');

    const query = {
      _id: body.code ? body.code : new mongoose.mongo.ObjectID(),
    };
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    };

    const product = await Products.findOneAndUpdate(query, body, options);

    return {
      statusCode: HC.OK.CREATED,
      body: JSON.stringify({ code: product._id }),
    };
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
