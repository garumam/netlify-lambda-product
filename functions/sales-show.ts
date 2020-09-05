import { Sequelize } from 'sequelize';
import { Handler, Context } from 'aws-lambda';
import Database from './SaleContext/database';
import HC from './utils/http-code';
import Sale from './SaleContext/models/Sale';
import { CustomResponse, CustomEvent } from './utils/CustomInterfaces';
import SaleValidations from './SaleContext/validators/SaleValidations';

interface ExpectedParams {
  id: string;
}

let conn: Sequelize | null = null;

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
    const id = event.queryStringParameters.id;

    const validator = await SaleValidations.show(id);

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

    const sale = await Sale.findByPk(id, {
      attributes: ['id', 'total_price', 'createdAt'],
      include: [
        {
          association: 'payment',
          attributes: ['status', 'updatedAt'],
        },
        {
          association: 'products',
          attributes: ['id', 'code', 'name', 'price'],
        },
      ],
    });

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ sale }),
    };
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
