import { selectUserByEmail, createUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import dotenv from "dotenv/config";
import { generateError, sendMailUtil } from "../../utils/index.js";
import { validationSchemaRegister } from "../../utils/validation.js";
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const validationObject = {
      name,
      email,
      password,
    };
    const { error } = Joi.object(validationSchemaRegister).validate(
      validationObject
    );

    if (error) {
      error.message = error.details[0].message;
      throw error;
    }

    const checkEmail = await selectUserByEmail(email);

    if (checkEmail) {
      generateError("Ya existe un usuario con este email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertId = await createUser(name, email, hashedPassword);

    // Hagamos el envío del correo
    const emailSubject = "Registro completado con éxito";
    const bodyMail = `¡Bienvenido/a ${name}! Gracias por registrarte`;

    await sendMailUtil(email, emailSubject, bodyMail);

    res.status(201).send({
      message: "Registro completado con éxito",
      data: { id: insertId, name, email, password },
    });
  } catch (error) {
    next(error);
  }
};
export default register;
