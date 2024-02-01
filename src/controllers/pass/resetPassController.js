import saveToken from "../../models/token/saveToken.js";
import { selectUserByEmail } from "../../models/users/index.js";
import { generateError, sendMailUtil } from "../../utils/index.js";
import jwt from "jsonwebtoken";

const resetPassController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError("Credenciales inválidas", 400);
    }

    // const emailSubject = "Recupera tu contraseña";
    // const bodyMail = `Pincha en este link para recuperar tu contraseña: https://acortar.link/tBdJJx`;

    // await sendMailUtil(email, emailSubject, bodyMail);

    const jwtPayload = { id: userDb.id };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    await saveToken(token, userDb.id);
    // El token se enviaría por correo electrónico como parámetro de la url, pero como estamos trabajando en un servidor local y no tenemos acceso desde fuera, lo enviamos directamente en el res.send
    res.send({
      status: "Ok",
      user: userDb,
      message: "¡Resetea tu Contraseña!",
      token: token,
      id: userDb.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default resetPassController;
