import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const seeLinksToday = async () => {
  const todayDate = new Date();
  await useDb();
  const [links] = await pool.query(
    "SELECT * FROM links WHERE DATE(createdAt) = DATE(?)",
    [todayDate]
  );
  console.log(links);
  return links;
};

export default seeLinksToday;
