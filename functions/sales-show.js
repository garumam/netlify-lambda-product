const db = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');
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
      conn = db.connection;
    }

    const sale = await Sale.findByPk(id, {
      attributes: ['id', 'total_price', 'createdAt'],
      include: [{
        association: 'payment',
        attributes: ['status', 'updatedAt']
      }, {
        association: 'products',
        attributes: ['id', 'name', 'price']
      }]
    });

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ sale })
    }
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}
