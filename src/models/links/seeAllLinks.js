import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const seeAllLinks = async (loggedUserId) => {
  await useDb();

  const [links] = await pool.query(
    "SELECT l.*, u.name, u.profilePicture,GROUP_CONCAT(v.userId) AS voterUserIds, IFNULL(AVG(v.rating), 0) rating, GROUP_CONCAT(v.rating) AS individualRatings, BIT_OR(v.userId = ?) votedByLoggedUser FROM links l LEFT JOIN userLink v ON l.id = v.linkId LEFT JOIN users u ON l.ownerId = u.id GROUP BY l.id;",
    [loggedUserId]
  );

  return links;
};

export default seeAllLinks;
