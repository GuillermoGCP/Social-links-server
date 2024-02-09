import Joi from "joi";
import { schema } from "../../utils/validation.js";
import { saveComment } from "../../models/comments/index.js";
import { validationComment } from "../../utils/validation.js";
import { selectUserById } from "../../models/users/index.js";
import { sendMailUtil } from "../../utils/index.js";
import { selectLinkById } from "../../models/links/index.js";

const createCommentController = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { comment, linkId } = req.body;

    //Validación con Joi:
    // const { error } = schema.validate(validationComment);
    // if (error) {
    //   error.message = error.details[0].message;
    //   throw error;
    // }
    //----------------------------
    const insertId = await saveComment(loggedUserId, linkId, comment);

    //Enviar email al usuario:
    const user = await selectUserById(loggedUserId);
    const email = user.email;
    const name = user.name;
    const emailSubject = "Enhorabuena, has comentado un enlace";
    const bodyMail = `¡${name}, has comentado un enlace en nuestra plataforma de enlaces.`;
    await sendMailUtil(email, emailSubject, bodyMail);

    const infoLink = await selectLinkById(linkId);
    res.send({
      status: "ok",
      message: "Has comentado un enlace!👌",
      data: infoLink,
    });
  } catch (error) {
    next(error);
  }
};

export default createCommentController;
