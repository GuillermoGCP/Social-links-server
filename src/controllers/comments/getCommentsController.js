import { getComments } from "../../models/comments/index.js";
const getCommentsController = async (req, res, next) => {
  try {
    const comments = await getComments();
    console.log(comments);
    if (!comments) {
      res.send({
        status: "ok",
        data: {
          message: "No hay comentarios publicados",
        },
      });
      return;
    }
    res.send({
      status: "ok",
      data: {
        message: "Estos son todos los comentarios publicados",
        comments: comments,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default getCommentsController;
