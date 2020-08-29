module.exports = {
  url: process.env.DB_URL_SALE,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredall: true,
  },
};