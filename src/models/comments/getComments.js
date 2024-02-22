import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";
const getComments = async (linkId) => {
  await useDb();
  const [comments] = await pool.query(
    `
    SELECT 
      c.*, 
      u.name , 
      u.profilePicture,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', r.id,
            'comment', r.comment,
            'userId', r.userId,
            'createdAt', r.createdAt,
            'modifiedAt', r.modifiedAt,
            'name', ru.name,
            'profilePicture', ru.profilePicture
          )
        )
        FROM commentsTable r
        JOIN users ru ON r.userId = ru.id
        WHERE r.parent_comment_id = c.id
      ) AS responses
    FROM commentsTable c
    JOIN users u ON c.userId = u.id
    WHERE c.linkId = ?
  `,
    [linkId]
  );
  return comments;
};

export default getComments;
