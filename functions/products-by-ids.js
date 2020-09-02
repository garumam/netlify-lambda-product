const Database = require('./ProductContext/database');
const HC = require('./utils/http-code');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

  try {
    const { productIds } = JSON.parse(event.body);

    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const products = await Products.find({
      isActive: true,
      _id: productIds,
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
