import dotenv from 'dotenv';
dotenv.config();

export default {
  url: process.env.DB_URL_PRODUCT,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
