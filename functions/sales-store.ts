import { Sequelize } from 'sequelize';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import Database from './SaleContext/database';
import HC from './utils/http-code';
import Sale, { ProductsToReserve } from './SaleContext/models/Sale';
import Payment from './SaleContext/models/Payment';
import PaymentApiAdapter from './SaleContext/adapters/PaymentApiAdapter';
import ProductApiAdapter from './SaleContext/adapters/ProductApiAdapter';
import { CustomResponse } from './utils/CustomInterfaces';

interface EventBody {
  products: ProductsToReserve[];
}

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

  if (conn == null) {
    conn = (await new Database().init()).connection;
  }

  const t = await conn.transaction();

  try {
    const data: EventBody = JSON.parse(event.body);

    if (!data.products || !Array.isArray(data.products)) {
      return {
        statusCode: HC.ERROR.BADREQUEST,
        body: JSON.stringify({
          error: "Array of 'products' is required on body",
        }),
      };
    }

    const sale = await Sale.create(
      {
        total_price: 0,
      },
      { transaction: t }
    );

    const error = await sale.reserveProducts({
      productsList: data.products,
      transaction: t,
    });

    if (error) return error;

    await sale.updateTotalPriceOfReservedProducts().save({ transaction: t });

    const { status } = await PaymentApiAdapter.getStatusFromPaymentContext();

    await Payment.create(
      {
        sale_id: sale.id,
        status,
      },
      { transaction: t }
    );

    if (status === 'disapproved') {
      await sale.cancelProductReservation(t);
    } else {
      await Promise.all(
        data.products.map((p) =>
          ProductApiAdapter.notifyProductContextWithCodeAndQtd(p.code, p.qtd)
        )
      );
    }

    await t.commit();
    return {
      statusCode: HC.OK.ACCEPTED,
      body: JSON.stringify({
        message: 'Seu pedido está sendo processado!',
      }),
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
