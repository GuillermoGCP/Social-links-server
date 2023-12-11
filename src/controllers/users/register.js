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
      nameError.message = nameError.details[0].message;
      throw nameError;
    }
    // Validar el correo electrónico
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
