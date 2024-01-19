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
  const fullProfilePicturePath = `/uploads/${profilePicture}`;
  pool.query(
    "UPDATE users SET name = ?, email = ?, password = ?, profilePicture = ?, biography = ? WHERE id = ?",
    [name, email, password, fullProfilePicturePath, biography, id]
  );
};

export default editProfile;
