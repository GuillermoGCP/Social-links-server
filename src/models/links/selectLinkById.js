import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const selectLinkById = async (linkId) => {
  await useDb();
  const [[link]] = await pool.query("SELECT * FROM links WHERE id = ?", [
    linkId,
  ]);

  return link;
};

export default selectLinkById;
