import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const editProfile = async (
  name,
  email,
  password,
  profilePicture,
  biography,
  id
) => {
  await useDb();

  pool.query(
    "UPDATE users SET name = ?, email = ?, password = ?, profilePicture = ?, biography = ? WHERE id = ?",
    [name, email, password, profilePicture, biography, id]
  );
};

export default editProfile;
