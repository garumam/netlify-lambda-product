import { Sequelize, Transaction } from 'sequelize';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import Database from './SaleContext/database';
import HC from './utils/http-code';
import Product from './SaleContext/models/Product';
import ProductApiAdapter from './SaleContext/adapters/ProductApiAdapter';
import { CustomResponse } from './utils/CustomInterfaces';
import { ProductDTO } from './SaleContext/DTO/ProductDTO';
import ProductValidations from './SaleContext/validators/ProductValidations';

interface EventBody extends Omit<ProductDTO, 'code'> {}

let conn: Sequelize | null = null;

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

  let t: Transaction;

  try {
    const body: EventBody = JSON.parse(event.body);

    const validator = await ProductValidations.store(body);

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

    t = await conn.transaction();

    const productsCreated = await Product.bulkCreate(
      new Array(body.qtd).fill({
        name: body.name,
        price: body.price,
      }),
      { transaction: t }
    );

    const { code } = await ProductApiAdapter.createProductInProductContext(
      body
    );

    await Product.update(
      {
        code,
      },
      {
        where: {
          id: productsCreated.map((p) => p.id),
        },
        transaction: t,
      }
    );

    await t.commit();
    return {
      statusCode: HC.OK.CREATED,
      body: JSON.stringify({ message: 'Product created' }),
    };
  } catch (err) {
    await t.rollback();
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

export { handler };
