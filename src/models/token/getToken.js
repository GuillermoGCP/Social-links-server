import useDb from "../../db/useDb.js";
import pool from "../../db/getPool.js";

const getToken = async (frontId) => {
  await useDb();
  const [[{ userId }]] = await pool.query(
    "SELECT userId FROM temporaryToken WHERE userId = ?",
    [frontId]
  );
  return userId;
};
export default getToken;
