import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";
const getComments = async (linkId) => {
  await useDb();
  const [comments] = await pool.query(
    `SELECT commentsTable.*, users. name, users.profilePicture FROM commentsTable 
  JOIN  users ON commentsTable.userId = users.id WHERE linkId = ?`,
    [linkId]
  );
  return comments;
};

export default getComments;
