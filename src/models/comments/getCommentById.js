import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";
const getCommentById = async (id) => {
  await useDb();
  const [comment] = await pool.query(
    `SELECT * FROM commentsTable 
   WHERE id = ?`,
    [id]
  );
  return comment;
};

export default getCommentById;
