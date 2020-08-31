const Database = require('./SaleContext/database');
const Product = require('./SaleContext/models/Product');
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
    const body = JSON.parse(event.body);

    const productsCreated = await Product.bulkCreate(
      (new Array(body.qtd)).fill({
        name: body.name,
        price: body.price
      }),
      { transaction: t }
    );

    const { code } = await ProductApiAdapter.createProductInProductContext(body);

    await Product.update({
      code
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