import express from "express";
import "dotenv/config";
import useDb from "./db/useDb.js";
import cors from "cors";
import bcrypt from "bcrypt";
import { login } from "./controllers/users/index.js";
import pool from "./db/getPool.js";
import {
  validatedName,
  validatedEmail,
  validatedPass,
} from "../src/utils/validation.js";
const { PORT } = process.env;

const app = express();
app.use(express.json());

// Rutas de usuarios ---------------------
app.post("/login", login);
// ---------------------------------------

//Middleware a nivel de aplicación, para manejar los json:
app.use(express.json());

//Ruta para registrarse:
app.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Validar con Joi...
    //********************************/
    // Validar el nombre
    const { error: nameError } = validatedName.validate(name);
    if (nameError) {
      return res.status(400).send(nameError.details[0].message);
    }

    // Validar el correo electrónico
    const { error: emailError } = validatedEmail.validate(email);
    if (emailError) {
      return res.status(400).send(emailError.details[0].message);
    }

    // Validar la contraseña
    const { error: passwordError } = validatedPass.validate(password);
    if (passwordError) {
      return res.status(400).send(passwordError.details[0].message);
    }
    //**********************************/
    await useDb();
    const [[checkEmail]] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (checkEmail) {
      console.error("Ya existe un usuario con este email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [{ insertId }] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).send({
      message: "Registro completado con éxito",
      data: { id: insertId, name, email },
    });
  } catch (error) {
    // next(error);
    console.error(error);
  }
});

//Ruta para crear un link:
app.post("/links", async (req, res) => {
  const loggedUserId = req.auth.id;
  const { url, title, description } = req.body;
  const [insertId] = await pool.query(
    "INSERT INTO links (url, title, description, ownerId)VALUES(?, ?, ?, ?)",
    [url, title, description, loggedUserId]
  );
  res.send({
    status: "ok",
    data: {
      id: insertId,
    },
  });
});

//Server:
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
