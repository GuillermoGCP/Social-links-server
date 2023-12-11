import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { selectUserByEmail } from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";
import dotenv from "dotenv/config.js";
import { validatedEmail, validatedPass } from "../../utils/validation.js";

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validar con Joi:
    //Validar el correo electrónico
    const { error: emailError } = validatedEmail.validate(email);
    if (emailError) {
      emailError.message = emailError.details[0].message;
      throw emailError;
    }
    // Validar la contraseña
    const { error: passwordError } = validatedPass.validate(password);
    if (passwordError) {
      passwordError.message = passwordError.details[0].message;
      throw passwordError;
    }

    const userDb = await selectUserByEmail(email);

    if (!userDb) {
      generateError("Credenciales inválidas", 400);
    }

    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {
      generateError("Credenciales inválidas", 400);
    }
    const jwtPayload = { id: userDb.id };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.send({ message: "Loggeado correctamente", data: { token } });
  } catch (error) {
    next(error);
  }
};

export default login;
