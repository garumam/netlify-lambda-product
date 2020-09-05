import { Connection } from 'mongoose';
import { Handler, Context } from 'aws-lambda';
import Database from './SearchContext/database';
import HC from './utils/http-code';
import { CustomResponse, CustomEvent } from './utils/CustomInterfaces';
import ProductValidations from './SearchContext/validators/ProductValidations';

interface ExpectedParams {
  search: string;
}

let conn: Connection | null = null;

const handler: Handler<CustomEvent<ExpectedParams>, CustomResponse> = async (
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
    const query = event.queryStringParameters;

    const validator = await ProductValidations.all(query);

    if (validator.error) {
      return {
        statusCode: HC.ERROR.BADREQUEST,
        body: JSON.stringify({
          error: validator.messages,
        }),
      };
    }

    const search = query.search ?? '';

    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const extraFilter: { name?: object } = {};
    if (search.replace(/ /g, '') !== '') {
      extraFilter.name = {
        $regex: new RegExp(search.trim().toLowerCase(), 'i'),
      };
    }

    const products = await Products.find({
      isActive: true,
      ...extraFilter,
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
