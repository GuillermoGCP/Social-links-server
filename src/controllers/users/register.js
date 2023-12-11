import { selectUserByEmail, createUser } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import {
  validatedName,
  validatedEmail,
  validatedPass,
} from "../../utils/validation.js";
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validamos con Joi...
    // Validar el nombre
    const { error: nameError } = validatedName.validate(name);
    if (nameError) {
      return res.status(400).send(nameError.details[0].message);
    }
    // Validar el correo electrónico
    const { error: emailError } = validatedEmail.validate(email);
    if (emailError) {
      return res.status(400).send(emailError.details[0].message);
    }
    // Validar la contraseña
    const { error: passwordError } = validatedPass.validate(password);
    if (passwordError) {
      return res.status(400).send(passwordError.details[0].message);
    }
    //**********************************/
    const checkEmail = await selectUserByEmail(email);

    if (checkEmail) {
      console.error("Ya existe un usuario con este email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertId = await createUser(name, email, hashedPassword);

    res.status(201).send({
      message: "Registro completado con éxito",
      data: { id: insertId, name, email },
    });
  } catch (error) {
    next(error);
  }
};
export default register;
