const Database = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');
const Payment = require('./SaleContext/models/Payment');
const PaymentApiAdapter = require('./SaleContext/adapters/PaymentApiAdapter');
const ProductApiAdapter = require('./SaleContext/adapters/ProductApiAdapter');
const HC = require('./utils/http-code');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  if (conn == null) {
    conn = (await new Database().init()).connection;
  }

  const t = await conn.transaction();

  try {
    const data = JSON.parse(event.body);

    if (!data.products || !Array.isArray(data.products)) {
      return {
        statusCode: HC.ERROR.BADREQUEST,
        body: JSON.stringify({ error: "Array of 'products' is required on body" })
      }
    }

    const sale = await Sale.create({
      total_price: 0
    }, { transaction: t });

    const error = await sale
      .reserveProducts({
        productsList: data.products,
        transaction: t
      });

    if (error.statusCode === HC.ERROR.NOTACCEPTABLE) {
      return error;
    }

    await sale.updateTotalPriceOfReservedProducts().save({ transaction: t });

    const { status } = await PaymentApiAdapter.getStatusFromPaymentContext();

    await Payment.create({
      sale_id: sale.id,
      status
    }, { transaction: t });

    if (status === 'disapproved') {

      await sale.cancelProductReservation({ transaction: t });

    } else {

      await Promise.all(
        data.products.map(
          p => (
            ProductApiAdapter.notifyProductContextWithCodeAndQtd(p.code, p.qtd)
          ))
      );

    }

    await t.commit();
    return {
      statusCode: HC.OK.ACCEPTED,
      body: JSON.stringify({
        message: 'Request in process'
      })
    }
  } catch (err) {
    await t.rollback();
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}
