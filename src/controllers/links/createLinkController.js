import { createLink } from "../../models/links/index.js";
import Joi from "joi";
import { schema } from "../../utils/validation.js";

const createLinkController = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { url, title, description } = req.body;

    //---------------------------
    //Validación con Joi:
    // Validar los datos del cuerpo de la solicitud

    const { error } = schema.validate(req.body);
    if (error) {
      error.message = error.details[0].message;
      throw error;
    }

    //----------------------------
    const insertId = await createLink(url, title, description, loggedUserId);

    res.send({
      status: "ok",
      data: {
        id: insertId,
        message: "Has compartido un enlace!👌",
      },
    });
  } catch (error) {
    next(error);
  }
};

export default createLinkController;
