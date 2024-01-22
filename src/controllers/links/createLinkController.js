import { selectUserById } from "../../models/users/index.js";
import { sendMailUtil } from "../../utils/index.js";
import { createLink } from "../../models/links/index.js";
import Joi from "joi";
import { schema } from "../../utils/validation.js";

const createLinkController = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { url, title, description } = req.body;

    //Validación con Joi:
    const { error } = schema.validate(req.body);
    if (error) {
      error.message = error.details[0].message;
      throw error;
    }
    //----------------------------
    const insertId = await createLink(url, title, description, loggedUserId);

    //*************************************/
    //Enviar email al usuario:
    const user = await selectUserById(loggedUserId);
    const email = user.email;
    const name = user.name;
    const emailSubject = "Enhorabuena, has compartido un enlace";
    const bodyMail = `¡${name}, has compartido un enlace en nuestra plataforma de enlaces. Ahora vota enlaces de otros usuarios y espera votaciones en el tuyo`;
    await sendMailUtil(email, emailSubject, bodyMail);
    //*************************************/

    res.send({
      status: "ok",
      data: {
        id: insertId,
        message: "Has compartido un enlace!👌",
        data: {
          url,
          title,
          description,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default createLinkController;
