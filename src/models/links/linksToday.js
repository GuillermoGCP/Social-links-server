import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const seeLinksToday = async (loggedUserId) => {
  const todayDate = new Date();
  await useDb();
  const [links] = await pool.query(
    "SELECT l.*, u.name, u.profilePicture,GROUP_CONCAT(v.userId) AS voterUserIds, IFNULL(AVG(v.rating), 0) rating, GROUP_CONCAT(v.rating) AS individualRatings, BIT_OR(v.userId = ?) votedByLoggedUser FROM links l LEFT JOIN userLink v ON l.id = v.linkId LEFT JOIN users u ON l.ownerId = u.id WHERE DATE(l.createdAt) = DATE(?) GROUP BY l.id ;",
    [loggedUserId, todayDate]
  );

  return links;
};

export default seeLinksToday;
