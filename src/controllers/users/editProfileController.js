import bcrypt from "bcrypt";
import { editProfile } from "../../models/users/index.js";
import {
  validatedBio,
  validatedName,
  validatedEmail,
  validatedPass,
  imageSchema,
} from "../../utils/validation.js";

const editProfileController = async (req, res, next) => {
  try {
    const profilePicture = req.file.filename;
    const patataId = req.auth.id;
    const { name, email, password, biography } = req.body;

    //Validación con Joi:
    //Validar nombre:
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

    //Validar bio:
    const { error: bioError } = validatedBio.validate(biography);
    if (bioError) {
      bioError.message = bioError.details[0].message;
      throw bioError;
    }
    //------------------------
    //Validar imagen:
    const { error: imageError } = imageSchema.validate({
      mimetype: req.file.mimetype,
    });
    if (imageError) {
      imageError.message = "Tipo de archivo no válido";
      throw imageError;
    }
    //----------------------

    const hashedPassword = await bcrypt.hash(password, 10);
    await editProfile(
      name,
      email,
      hashedPassword,
      profilePicture,
      biography,
      patataId
    );
    res.send({
      status: "Ok",
      data: {
        message: "Datos actualizados correctamente",
      },
    });
  } catch (error) {
    next(error);
  }
};

export default editProfileController;
