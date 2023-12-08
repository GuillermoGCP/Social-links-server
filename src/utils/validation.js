import Joi from "joi";

// Validar el nombre
const validatedName = Joi.string().min(3).max(30).required();

// Esquema de validación para el correo electrónico
const validatedEmail = Joi.string().email().required();

// Esquema de validación para la contraseña
const validatedPass = Joi.string().min(6).required();
export { validatedName, validatedEmail, validatedPass };
