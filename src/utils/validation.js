import Joi from "joi";

const validationSchemaRegister = {
  name: Joi.string().max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  biography: Joi.string().min(10).max(255),
};

const validationSchemaLogin = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

//Esquema para los comentarios:
const validationComment = {
  comment: Joi.string().min(10).max(500),
};

//Esquema para links:
const schema = Joi.object({
  url: Joi.string().uri().required(),
  title: Joi.string().max(24).required(),
  description: Joi.string().max(255).required(),
});

//Validar voto de link:
const validatedRating = Joi.number().integer().min(0).max(10).required();

//Exporto las variables:
export {
  schema,
  validatedRating,
  validationSchemaRegister,
  validationSchemaLogin,
  validationComment,
};
