//Módulos:
import express from "express";
import "dotenv/config";
import cors from "cors";

//Importaciones propias:
import { login, register } from "./controllers/users/index.js";
import pool from "./db/getPool.js";
import {manageError, notFound} from "./middlewares/index.js";

//Middlewares de aplicación:
const app = express();
app.use(express.json());
app.use(cors());

// Rutas:
app.post("/login", login);
app.post("/register", register);

//Middleware a nivel de aplicación, para manejar los json:
app.use(express.json());

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

//Middlewares
app.use(notFound);
app.use(manageError);

//Server:
app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en el puerto ${process.env.PORT}`);
});
