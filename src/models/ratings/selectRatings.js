import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const selectRatings = async (loggedUserId, linkId) => {
  await useDb();
  const [[ratingsData]] = await pool.query(
    "SELECT * FROM userLink WHERE userId = ? AND linkId = ?",
    [loggedUserId, linkId]
  );
  if (ratingsData) {
    return ratingsData;
  }
};
export default selectRatings;
