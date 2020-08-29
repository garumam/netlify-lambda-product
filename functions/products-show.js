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