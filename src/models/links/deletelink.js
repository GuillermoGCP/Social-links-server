import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const deleteLink = async (linkId) => {
  await useDb();
  await pool.query("DELETE FROM userLink WHERE linkId = ?", [linkId]);
  await pool.query("DELETE FROM commentsTable WHERE linkId = ?", [linkId]);
  await pool.query("DELETE FROM links WHERE id = ?", [linkId]);
};

export default deleteLink;
