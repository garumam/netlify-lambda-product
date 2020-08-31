const Database = require('./ProductContext/database');
const HC = require('./utils/http-code');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = event.queryStringParameters.id

  if (event.httpMethod !== 'GET' || !id) {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  try {
    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const product = await Products.findById(id);

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ product })
    }
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}