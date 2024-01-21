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
      const defaultImagePath = path.join("uploads", "imagenPredeterminada.jpg");
      const currentImagePath = path.join("src", "uploads", profilePicture);

      if (profilePicture && currentImagePath !== defaultImagePath) {
        try {
          await fs.promises.access(currentImagePath);

          await fs.unlink(currentImagePath);
        } catch (error) {
          // next(error);
          console.log("Aquí");
        }
      }

      profilePicture = req.file.filename;
    }

    //Validación con Joi:
    const validationObject = {
      name,
      email,
      password,
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
