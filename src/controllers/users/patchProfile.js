import bcrypt from "bcrypt";
import fs from "fs/promises";
import { selectUserById } from "../../models/users/index.js";
import { editProfile } from "../../models/users/index.js";
import {
  validatedBio,
  validatedName,
  validatedEmail,
  validatedPass,
} from "../../utils/validation.js";

const patchProfileController = async (req, res, next) => {
  try {
    const patataId = req.auth.id;
    //Modificamos datos con patch:
    const userData = await selectUserById(patataId);
    const userToUpdate = {
      ...userData,
      ...req.body,
    };

    let { name, email, password, profilePicture, biography } = userToUpdate;

    //Si envías una nueva foto, te borra la anterior de la carpeta uploads:
    if (req.file) {
      if (
        profilePicture &&
        profilePicture !== "/uploads/imagenPredeterminada.jpg"
      ) {
        await fs.unlink(`./src/uploads/${profilePicture}`);
      }
      profilePicture = req.file.filename;
    }

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

export default patchProfileController;
