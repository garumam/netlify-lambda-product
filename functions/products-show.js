const dbConnection = require('./services/mongodbconnection');
const ProductDB = require('./ProductContext/database/ProductDB');

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
      conn = await dbConnection(new ProductDB());
    }

    const Products = conn.model('Products');

    const id = event.queryStringParameters.id

    const product = await Products.findById(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ product })
    }
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}