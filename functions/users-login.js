const api = require('./services/api');

exports.handler = async (event, context, callback) => {
  console.info('EVENT:', event);
  console.info('*******************************');
  console.info('CONTEXT:', context.clientContext);
  try {
    const res = await api.get('/.netlify/functions/products-all');

    return {
      statusCode: 200,
      body: JSON.stringify({ products: res.data.products })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    }
  }
}