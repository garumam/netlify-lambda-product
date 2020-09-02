const Database = require('./ProductContext/database');
const HC = require('./utils/http-code');

let conn = null;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  }

  try {
    const search = event.queryStringParameters.search;

    if (conn == null) {
      conn = (await new Database().init()).connection;
    }

    const Products = conn.model('Products');

    const extraFilter = {};
    if (search.replace(/ /g, '') !== '') {
      extraFilter.name = {
        $regex: new RegExp(search.trim().toLowerCase(), 'i'),
      };
    }

    const products = await Products.find({
      isActive: true,
      ...extraFilter,
    });

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ products }),
    };
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
