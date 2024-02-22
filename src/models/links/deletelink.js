import pool from "../../db/getPool.js";
import useDb from "../../db/useDb.js";

const deleteLink = async (linkId) => {
  await useDb();

  // Obtener los IDs de los comentarios hijos
  const childCommentIds = await pool.query(
    "SELECT id FROM commentsTable WHERE parent_comment_id IN (SELECT id FROM commentsTable WHERE linkId = ?)",
    [linkId]
  );

  // Eliminar los comentarios hijos
  for (const commentId of childCommentIds) {
    await pool.query("DELETE FROM commentsTable WHERE id = ?", [commentId.id]);
  }

  // Eliminar los comentarios principales
  await pool.query("DELETE FROM commentsTable WHERE linkId = ?", [linkId]);

  await pool.query("DELETE FROM userLink WHERE linkId = ?", [linkId]);
  await pool.query("DELETE FROM links WHERE id = ?", [linkId]);
};

export default deleteLink;
