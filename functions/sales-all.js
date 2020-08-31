const Database = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');
const HC = require('./utils/http-code');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  try {
    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const sales = await Sale.findAll();

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ sales })
    }
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}
