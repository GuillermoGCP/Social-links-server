import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";
const saveComment = async (loggedUserId, linkId, comment) => {
  await useDb();
  const [{ insertId }] = await pool.query(
    "INSERT INTO commentsTable (userId, linkId, comment)VALUES(?, ?, ?)",
    [loggedUserId, linkId, comment]
  );
  return insertId;
};

export default saveComment;
