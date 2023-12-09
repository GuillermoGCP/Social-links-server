import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const createLink = async (url, title, description, loggedUserId) => {
  await useDb();
  const [{ insertId }] = await pool.query(
    "INSERT INTO links (url, title, description, ownerId)VALUES(?, ?, ?, ?)",
    [url, title, description, loggedUserId]
  );
  return insertId;
};

export default createLink;
