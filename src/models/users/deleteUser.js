import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";
import { deleteLink } from "../links/index.js";

const deleteUser = async (userId) => {
  await useDb();

  //Borrar las votaciones del usuario:
  await pool.query("DELETE FROM userLink WHERE userId = ?", [userId]);

  // Obtener los IDs de las respuestas a los comentarios:
  const childCommentIds = await pool.query(
    "SELECT id FROM commentsTable WHERE parent_comment_id IN (SELECT id FROM commentsTable WHERE userId = ?)",
    [userId]
  );
  // Eliminar las respuestas del usuario:
  for (const commentId of childCommentIds) {
    await pool.query("DELETE FROM commentsTable WHERE id = ?", [commentId.id]);
  }

  //Eliminar referencias en la tabla de comentarios:
  await pool.query(
    "DELETE FROM commentsTable WHERE linkId IN (SELECT id FROM links WHERE ownerId = ?)",
    [userId]
  );

  // Eliminar los comentarios principales del usuario:
  await pool.query("DELETE FROM commentsTable WHERE userId = ?", [userId]);

  // Consultar la tabla links para obtener los ids de los links del usuario a eliminar:
  const linkIdsToDelete = await pool.query(
    "SELECT id FROM links WHERE ownerId = ?",
    [userId]
  );
  //Eliminar referencias en la tabla userLinks:
  await pool.query(
    "DELETE FROM userlink WHERE linkId IN (SELECT id FROM links WHERE ownerId = ?)",
    [userId]
  );

  for (const link of linkIdsToDelete) {
    await deleteLink(link.id);
  }
  //******************************************************/
  // Eliminar los links del usuario:
  await pool.query("DELETE FROM links WHERE ownerId = ?", [userId]);

  //Eliminar usuario:
  await pool.query("DELETE FROM users WHERE id = ?", [userId]);
};
export default deleteUser;
