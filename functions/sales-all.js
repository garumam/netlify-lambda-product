const db = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  try {
    if (conn == null) {
      conn = db.connection;
    }

    const sales = await Sale.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify({ sales })
    }
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}
