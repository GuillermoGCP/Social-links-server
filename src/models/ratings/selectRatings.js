import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const selectRatings = async (loggedUserId) => {
    await useDb();
    const [[ratingsData]]=await pool.query("SELECT*FROM userLink WHERE userId = ?", [loggedUserId]);
    return ratingsData
  };
  export default selectRatings;