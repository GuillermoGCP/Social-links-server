import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";
const saveComment = async (
  loggedUserId,
  linkId,
  comment,
  parent_comment_id = null
) => {
  await useDb();
  const [{ insertId }] = await pool.query(
    "INSERT INTO commentsTable (userId, linkId, comment, parent_comment_id)VALUES(?, ?, ?, ?)",
    [loggedUserId, linkId, comment, parent_comment_id]
  );
  return insertId;
};

export default saveComment;
