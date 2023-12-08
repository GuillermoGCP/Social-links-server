import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { selectUserByEmail } from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";
import dotenv from "dotenv/config.js";

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDb = await selectUserByEmail(email);

    if (!userDb) {
      generateError("Credenciales inválidas", 400);
    }

    const isPasswordOk = await bcrypt.compare(password, userDb.password);

    if (!isPasswordOk) {
      generateError("Credenciales inválidas", 400);
    }
    const jwtPayload = { id: userDb.id };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.send({ message: "Loggeado correctamente", data: { token } });
  } catch (error) {
        next(error);
    
  }
};

export default login;
