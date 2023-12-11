//Módulos:
import express from "express";
import "dotenv/config";
import cors from "cors";

//Importaciones propias:
import { login, register } from "./controllers/users/index.js";
import {
  seeAllLinksController,
  seeLinksTodayController,
  previousLinksController,
  createLinkController,
  deleteLinkController,
  linkIdController,
} from "./controllers/links/index.js";
import { manageError, notFound, validateAuth } from "./middlewares/index.js";

//Middlewares de aplicación:
const app = express();
app.use(express.json());
app.use(cors());

// Rutas:
app.post("/login", login);
app.post("/register", register);

//Ruta para crear un link:
app.post("/links", validateAuth, createLinkController);

//Ruta para ver los links de hoy:
app.get("/links/today", validateAuth, seeLinksTodayController);
//Ruta para ver los links anteriores a hoy:
app.get("/links/previous", validateAuth, previousLinksController);
//Ruta para ver todos los links:
app.get("/links/all", validateAuth, seeAllLinksController);
// Ruta para borrar link
app.delete("/links/:linkId", validateAuth, deleteLinkController);
//Ruta para ver links con id
app.get("/links/:linkId", validateAuth, linkIdController);

//Middlewares
app.use(notFound);
app.use(manageError);

//Server:
app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en el puerto ${process.env.PORT}`);
});
