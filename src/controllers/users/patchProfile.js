import bcrypt from "bcrypt";
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
    };

    let { name, email, password, profilePicture, biography } = userToUpdate;

    //Si envías una nueva foto, se borra la anterior de la carpeta uploads:
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
    const hashedPassword = await bcrypt.hash(password, 10);
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
