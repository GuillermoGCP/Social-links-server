import { getComments } from "../../models/comments/index.js";
const getCommentsController = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const commentsFromModel = await getComments(linkId);
    if (!commentsFromModel) {
      res.send({
        status: "ok",
        data: {
          message: "No hay comentarios publicados",
        },
      });
      return;
    }
    let comments =
      commentsFromModel &&
      commentsFromModel.map((response) => {
        const parseResponses = JSON.parse(response.responses);
        return { ...response, parseResponses };
      });
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
