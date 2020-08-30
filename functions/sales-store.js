const Op = require('sequelize').Op;
const db = require('./SaleContext/database');
const Sale = require('./SaleContext/models/Sale');
const Product = require('./SaleContext/models/Product');
const Payment = require('./SaleContext/models/Payment');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  if (conn == null) {
    conn = db.connection;
  }

  const t = await conn.transaction();

  try {
    const data = JSON.parse(event.body);

    if (!data.products || !Array.isArray(data.products)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Array of 'products' is required on body" })
      }
    }

    let productsArray = [];

    const sale = await Sale.create({
      total_price: 0
    }, { transaction: t });

    for (const product of data.products) {

      const products = await Product.findAll(
        {
          where: {
            name: {
              [Op.iLike]: product.name
            },
            sale_id: null
          },
          limit: product.qtd,
          raw: true
        },
        { transaction: t }
      );

      const [numberOfUpdatedRows] = await Product.update(
        { sale_id: sale.id },
        {
          transaction: t,
          where: {
            id: products.map(p => p.id),
            sale_id: null
          }
        }
      );

      if (numberOfUpdatedRows < product.qtd) {
        await t.rollback();
        return {
          statusCode: 400,
          body: JSON.stringify({
            error:
              `${product.name} - qtd required: ${product.qtd} but available only: ${numberOfUpdatedRows}`
          })
        }
      }

      productsArray = [...productsArray, ...products];
    }

    const total_price = productsArray.reduce((prev, current) => {
      return (prev + parseFloat(current.price));
    }, 0);

    sale.set({
      total_price
    });

    await sale.save({ transaction: t });

    const payment = await Payment.create({
      sale_id: sale.id
    }, { transaction: t });

    //lembrar de fazer um request para o outro contexto de payment
    // passando o payment do console abaixo
    console.log(payment.get());

    await t.commit();
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Request in process'
      })
    }
  } catch (err) {
    await t.rollback();
    console.error(err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}
