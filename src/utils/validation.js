import Joi from "joi";

const validationSchemaRegister = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  validatedBio: Joi.string().min(10).max(255),
};

const validationSchemaLogin = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

//Esquema para links:
const schema = Joi.object({
  url: Joi.string().uri().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

//Validar voto de link:
const validatedRating = Joi.number().integer().min(0).max(10).required();

//Exporto las variables:
export {
  schema,
  validatedRating,
  validationSchemaRegister,
  validationSchemaLogin,
};
