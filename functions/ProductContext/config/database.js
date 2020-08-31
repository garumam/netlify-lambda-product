require('dotenv').config();

module.exports = {
  url: process.env.DB_URL_PRODUCT,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};