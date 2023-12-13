import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

// SelectUserByEmail
const selectUserById = async (id) => {
  await useDb();
  const [[user]] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

  return user;
};

export default selectUserById;