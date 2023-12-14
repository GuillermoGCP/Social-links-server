import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const getOwnLinks= async (ownerId)=>{
    await useDb();
    const [links]=await pool.query("SELECT * FROM links WHERE ownerId = ?", [
        ownerId,
      ])
      return links

}

export default getOwnLinks