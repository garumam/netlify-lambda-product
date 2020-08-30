const HC = require('./utils/http-code');

exports.handler = async (event, context, callback) => {

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: HC.ERROR.NOTFOUND,
      body: JSON.stringify({ error: 'Not Found' })
    }
  }

  try {
    const status = ['pending', 'approved', 'disapproved'];

    return {
      statusCode: HC.OK.GENERIC,
      body: JSON.stringify({ status: status[Math.round(Math.random() * 2)] })
    }
  } catch (err) {
    return {
      statusCode: HC.ERROR.INTERNALERROR,
      body: JSON.stringify({ error: 'Something went wrong' })
    }
  }
}
