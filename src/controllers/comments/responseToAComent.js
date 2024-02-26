import Joi from "joi";
import {
  getCommentById,
  getComments,
  saveComment,
} from "../../models/comments/index.js";
import { validationComment } from "../../utils/validation.js";
import { selectUserById } from "../../models/users/index.js";

const responseToAComent = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { comment, linkId, parent_comment_id } = req.body;

    // Validación con Joi:
    const { error } = Joi.object(validationComment).validate(comment);
    //----------------------------
    const id = await saveComment(
      loggedUserId,
      linkId,
      comment,
      parent_comment_id
    );

    //Datos del link y usuario padre:
    const [parentComment] = await getCommentById(parent_comment_id);
    const parentUser = await selectUserById(parentComment.userId);
    const commentsFromModel = await getComments(linkId);
    let comments =
      commentsFromModel &&
      commentsFromModel.map((response) => {
        const parseResponses = JSON.parse(response.responses);
        return { ...response, parseResponses };
      });
    res.send({
      status: "ok",
      message: `Has respondido al comentario de ${parentUser.name}`,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export default responseToAComent;
