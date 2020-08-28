require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

exports.handler = (event, context, callback) => {

  // "event" has information about the path, body, headers, etc. of the request
  console.log('event', event)
  switch (event.httpMethod) {
    case 'GET':
      if (!!event.queryStringParameters.id) {
        return show(event, context, callback);
      }
      return index(event, context, callback);
  }
  return callback(null, {
    statusCode: 404,
    body: JSON.stringify({
      error: 'Not Found'
    })
  })
}

function index(event, context, callback) {

  db.on('error', function () {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Something went wrong'
      })
    })
  });
  db.once('open', async function () {
    const Schema = mongoose.Schema;
    const Order = mongoose.model('sales', Schema({}));

    const items = await Order.find().limit(10);

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(items)
    })
  });
}

function show(event, context, callback) {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: { id: 'gd8sag8duga', name: 'Produto 1' }
    })
  })
}