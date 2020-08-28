require('dotenv').config();
const mongoose = require('mongoose');
const Sales = require('./schemas/Sales');

exports.handler = (event, context, callback) => {

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
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  console.info('*********METODO INDEX*******');
  db.on('error', function () {
    console.info('*********ON ERROR*******');
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Something went wrong'
      })
    })
  });
  db.once('open', async function () {
    console.info('*********ON OPEN*******');
    const items = await Sales.find().limit(10);
    await db.close();
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