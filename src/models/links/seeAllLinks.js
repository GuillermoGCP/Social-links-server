import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const seeAllLinks = async () => {
  await useDb();
  const [links] = await pool.query("SELECT * FROM links");
  return links;
};
export default seeAllLinks;
