const db = require('./SaleContext/database');
const Product = require('./SaleContext/models/Product');
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
    const body = JSON.parse(event.body);

    const productsCreated = await Product.bulkCreate(
      (new Array(body.qtd)).fill({
        name: body.name,
        price: body.price
      }),
      { transaction: t }
    );

    const res = await api.put('/.netlify/functions/products-store', body);

    await Product.update({
      code: res.data.code
    }, {
      where: {
        id: productsCreated.map(p => p.id)
      },
      transaction: t
    });

    await t.commit();
    return {
      statusCode: HC.OK.CREATED,
      body: JSON.stringify({ message: 'Product created' })
    }
  } catch (err) {
    await t.rollback();
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}