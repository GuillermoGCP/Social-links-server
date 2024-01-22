import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const selectLinkById = async (linkId) => {
  await useDb();
  const [[link]] = await pool.query(
    "SELECT l.*, u.name, u.profilePicture, 0 rating, 0 votedByLoggedUser FROM links l LEFT JOIN users u ON l.ownerId = u.id WHERE l.id = ?;",
    [linkId]
  );

  return link;
};

export default selectLinkById;
