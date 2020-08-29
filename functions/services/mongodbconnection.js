
module.exports = async function dbConnection(db) {
  const conn = await db.connection();

  return conn;
}
