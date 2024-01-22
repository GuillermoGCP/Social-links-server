import bcrypt from "bcrypt";
import path from "path";
import fs from "fs/promises";
import Joi from "joi";
import { selectUserById } from "../../models/users/index.js";
import { editProfile } from "../../models/users/index.js";
import { validationSchemaRegister } from "../../utils/validation.js";

const patchProfileController = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    //Modificamos datos con patch:
    const userData = await selectUserById(userId);
    const userToUpdate = {
      ...userData,
      ...req.body,
      ...req.file,
    };

    let { name, email, password, profilePicture, biography } = userToUpdate;

    //Si envías una nueva foto, se borra la anterior de la carpeta uploads:
    if (req.file) {
      const defaultImagePath = path.join(
        "src",
        "uploads",
        "imagenPredeterminada.jpg"
      );
      const currentImagePath = path.join("src", "uploads", profilePicture);

      try {
        // Si la imagen actual no es la predeterminada, intenta borrarla
        if (currentImagePath && currentImagePath !== defaultImagePath) {
          // await fs.promises.access(currentImagePath);
          await fs.unlink(currentImagePath);
        }
      } catch (error) {
        console.error(
          "Error al acceder o eliminar la imagen actual:",
          error.message
        );
      }

      profilePicture = req.file.filename;
    }

    //Validación con Joi:
    const validationObject = {
      name,
      email,
      password,
      biography,
    };
    // Validamos con Joi...
    const { error } = Joi.object(validationSchemaRegister).validate(
      validationObject
    );

    if (error) {
      error.message = error.details[0].message;
      throw error;
    }
    let hashedPassword = password;
    req.body.password
      ? (hashedPassword = await bcrypt.hash(password, 10))
      : (hashedPassword = password);

    await editProfile(
      name,
      email,
      hashedPassword,
      profilePicture,
      biography,
      userId
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
