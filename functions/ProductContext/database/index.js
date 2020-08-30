
module.exports = async function dbConnection(db) {
  const conn = await (new db()).connection();

  return conn;
}
