const db = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = event.queryStringParameters.id

  if (event.httpMethod !== 'GET' || !id) {
    return {
      statusCode: 404,
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
      statusCode: 200,
      body: JSON.stringify({ sale })
    }
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}


    // await Payment.create({
    //   sale_id: sales[0].id
    // });

    // const product = await Product.create({
    //   name: 'produto 1',
    //   price: 255.50,
    //   sale_id: sale[0].id
    // });

    //const saleWithProducts = await sale[0].getProducts();

    // const saleWithPayment = await sales[0].getPayment();