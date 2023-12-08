import pool from "../../db/getPool.js";

// SelectUserByEmail
const selectUserByEmail = async (email) => {
  const [[userWithSameEmail]] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return userWithSameEmail;
};

export default selectUserByEmail;
