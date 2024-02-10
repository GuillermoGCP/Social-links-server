import Joi from "joi";
import { getCommentById, saveComment } from "../../models/comments/index.js";
import { validationComment } from "../../utils/validation.js";
import { selectUserById } from "../../models/users/index.js";
import { sendMailUtil } from "../../utils/index.js";

const createCommentController = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { comment, linkId } = req.body;

    // Validación con Joi:
    const { error } = Joi.object(validationComment).validate(comment);
    //----------------------------
    const id = await saveComment(loggedUserId, linkId, comment);

    //Enviar email al usuario:
    const user = await selectUserById(loggedUserId);
    const email = user.email;
    const name = user.name;
    const emailSubject = "Enhorabuena, has comentado un enlace";
    const bodyMail = `¡${name}, has comentado un enlace en nuestra plataforma de enlaces.`;
    await sendMailUtil(email, emailSubject, bodyMail);

    const commentData = await getCommentById(id);

    res.send({
      status: "ok",
      message: "Has comentado un enlace!👌",
      data: {
        id: id,
        comment: comment,
        userId: loggedUserId,
        linkId: linkId,
        createdAt: commentData[0].createdAt,
        modifiedAta: commentData[0].modifiedAt,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default createCommentController;
