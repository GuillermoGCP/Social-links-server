import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const editProfile = async (name, email, password, id) => {
  await useDb();
  pool.query(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
    [name, email, password, id]
  );
};

export default editProfile;
