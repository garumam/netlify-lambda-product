const mongoose = require('mongoose');
const dbConnection = require('./ProductContext/database');
const MongoDB = require('./ProductContext/database/MongoDB');
const HC = require('./utils/http-code');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  try {

    if (conn == null) {
      conn = await dbConnection(MongoDB);
    }

    const body = JSON.parse(event.body);

    const Products = conn.model('Products');

    const query = { _id: body.code },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };

    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }

    const product = await Products.findOneAndUpdate(query, body, options);

    return {
      statusCode: HC.OK.CREATED,
      body: JSON.stringify({ code: product._id })
    }
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}