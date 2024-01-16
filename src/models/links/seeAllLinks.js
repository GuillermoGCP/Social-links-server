import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const seeAllLinks = async (loggedUserId) => {
  await useDb();

  const [links] = await pool.query(
    "SELECT l.*, u.name, u.profilePicture, IFNULL(AVG(v.rating), 0) rating, BIT_OR(v.userId = ?) votedByLoggedUser FROM links l LEFT JOIN userlink v ON l.id = v.linkId LEFT JOIN users u ON l.ownerId = u.id GROUP BY l.id;",
    [loggedUserId]
  );

  return links;
};

export default seeAllLinks;
