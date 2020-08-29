const dbConnection = require('./schemas/mongodbconnection');

let conn = null;

exports.handler = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    try {
      conn = await dbConnection();
    } catch (err) {
      console.error(err.message);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Something went wrong' })
      }
    }
  }

  try {
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