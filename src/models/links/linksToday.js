import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const seeLinksToday = async () => {
  const todayDate = new Date();
  await useDb();
  const [links] = await pool.query(
    "SELECT l.*, u.name, u.profilePicture FROM links l JOIN users u ON l.ownerId = u.id WHERE DATE(l.createdAt) = DATE(?);",
    [todayDate]
  );
  console.log(links);
  return links;
};

export default seeLinksToday;
