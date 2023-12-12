import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const updateRating = async (rating, ratingId) => {
  await useDb();
  await pool.query("UPDATE userLink SET rating = ? WHERE id = ?", [rating, ratingId]);
};
export default updateRating;