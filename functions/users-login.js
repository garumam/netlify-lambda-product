const db = require('./SaleContext/database');
const api = require('./services/api');
const Product = require('./SaleContext/models/Product');

exports.handler = async (event, context, callback) => {

  try {
    //const res = await api.get('/.netlify/functions/products-all');
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ products: res.data.products })
    // }

    const product = await Product.create({
      name: 'Produto 3',
      price: 160.27
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ product })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    }
  }
}