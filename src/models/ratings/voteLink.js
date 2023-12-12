import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const voteLink= async(loggedUserId,linkId,rating)=>{
    await useDb();

    const [{voted}]= await pool.query("INSERT INTO userLink (userID,linkId,rating)VALUES(?,?,?)",
    [loggedUserId,linkId,rating]
    );
    return voted;

}
export default voteLink;