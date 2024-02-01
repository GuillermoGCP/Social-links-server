import getToken from "../../models/token/getToken.js";
import { generateError } from "../../utils/index.js";
import jwt from "jsonwebtoken";

const checkPass = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userIdFromToken = req.body.idFromBack;

    let tokenPayload;

    try {
      tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      generateError("El token es inválido", 400);
    }
    const id = await getToken(userIdFromToken);
    console.log(id, "uuuuuuuuuuuu!!");
    if (userIdFromToken !== id) {
      generateError("¡Los id no coinciden!");
    }
    res.send({
      status: "Ok",
      message: "¡Token Verificado!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default checkPass;
