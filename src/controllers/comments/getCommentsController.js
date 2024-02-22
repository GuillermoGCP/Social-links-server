import { getComments } from "../../models/comments/index.js";
const getCommentsController = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const comments = await getComments(linkId);
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
      message: "Estos son todos los comentarios publicados",
      comments,
    });
  } catch (error) {
    next(error);
  }
};
export default getCommentsController;
