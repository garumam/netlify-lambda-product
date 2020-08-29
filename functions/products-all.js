const dbConnection = require('./services/mongodbconnection');

let conn = null;

exports.handler = async (event, context, callback) => {
  console.info('EVENT:', event);
  console.info('*******************************');
  console.info('CONTEXT:', context);
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  try {
    if (conn == null) {
      conn = await dbConnection();
    }

    const Products = conn.model('Products');

    const products = await Products.find().limit(10);

    return {
      statusCode: 200,
      body: JSON.stringify({ products })
    }
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}