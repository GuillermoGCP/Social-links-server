import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

// SelectUserByEmail
const selectUserByEmail = async (email) => {
  await useDb();
  const [[userWithSameEmail]] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return userWithSameEmail;
};

export default selectUserByEmail;
