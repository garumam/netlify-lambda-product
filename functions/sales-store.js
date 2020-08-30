const db = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');
const Product = require('./SaleContext/models/Product');
const Payment = require('./SaleContext/models/Payment');
const api = require('./services/api');
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
    conn = db.connection;
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

    let productsArray = [];

    const sale = await Sale.create({
      total_price: 0
    }, { transaction: t });

    for (const product of data.products) {

      const products = await Product.findAll(
        {
          where: {
            code: product.code,
            sale_id: null
          },
          raw: true,
          transaction: t
        }
      );

      if (products.length < product.qtd) {
        await t.rollback();
        return {
          statusCode: HC.ERROR.NOTACCEPTABLE,
          body: JSON.stringify({
            error:
              `${product.name || 'Not Available'} - qtd required: ${product.qtd} but available only: ${products.length}`
          })
        }
      }

      const productsToReserve = products.slice(0, product.qtd);

      const [numberOfUpdatedRows] = await Product.update(
        { sale_id: sale.id },
        {
          transaction: t,
          where: {
            id: productsToReserve.map(p => p.id),
            sale_id: null
          }
        }
      );

      if (numberOfUpdatedRows < product.qtd) {
        await t.rollback();
        return {
          statusCode: HC.ERROR.NOTACCEPTABLE,
          body: JSON.stringify({
            error:
              `${products[0].name} - qtd required: ${product.qtd} but available only: ${numberOfUpdatedRows}`
          })
        }
      }

      product.qtd = products.length - product.qtd;

      productsArray = [...productsArray, ...productsToReserve];
    }

    const total_price = productsArray.reduce((prev, current) => {
      return (prev + parseFloat(current.price));
    }, 0);

    sale.set({
      total_price
    });

    await sale.save({ transaction: t });

    const res = await api.get('/.netlify/functions/payment-store');

    await Payment.create({
      sale_id: sale.id,
      status: res.data.status
    }, { transaction: t });

    if (res.data.status === 'disapproved') {

      await Product.bulkCreate(
        productsArray.map(p => ({
          name: p.name,
          price: p.price,
          code: p.code
        })),
        { transaction: t }
      );

    } else {

      //REQUEST PARA ATUALIZAR A QTD NO CONTEXTO DE PRODUTO (sincrono)
      await Promise.all(
        data.products.map(
          p => (
            api.put('/.netlify/functions/products-store', { code: p.code, qtd: p.qtd })
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
