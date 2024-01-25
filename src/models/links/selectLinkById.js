import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const selectLinkById = async (linkId,loggedUserId) => {
  await useDb();
  const [[link]] = await pool.query(
    "SELECT l.*, u.name, u.profilePicture, IFNULL(AVG(v.rating), 0) rating, BIT_OR(v.userId = ?) votedByLoggedUser FROM links l LEFT JOIN userLink v ON l.id = v.linkId LEFT JOIN users u ON l.ownerId = u.id WHERE l.id=?;",
    [loggedUserId,linkId]
  );

  return link;
};

export default selectLinkById;
