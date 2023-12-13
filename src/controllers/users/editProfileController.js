import bcrypt from "bcrypt";
import { editProfile } from "../../models/users/index.js";

const editProfileController = async (req, res, next) => {
  try {
    const patataId = req.auth.id;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await editProfile(name, email, hashedPassword, patataId);
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
