//Módulos:
import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";

//Importaciones propias:
import { storage } from "./utils/index.js";
import {
  editProfileController,
  login,
  register,
} from "./controllers/users/index.js";
import {
  seeAllLinksController,
  seeLinksTodayController,
  previousLinksController,
  createLinkController,
  deleteLinkController,
  linkIdController,
  voteLinkController,
} from "./controllers/links/index.js";
import { manageError, notFound, validateAuth } from "./middlewares/index.js";

//Middlewares de aplicación:
const upload = multer({ storage: storage });
const app = express();
app.use(express.json());
app.use(cors());

// Rutas:
app.post("/login", login);
app.post("/register", register);

//Ruta de Editar Perfil
app.put(
  "/profile",
  validateAuth,
  upload.single("profilePicture"),
  editProfileController
);

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
//Ruta para votar un link:
app.post("/links/:linkId", validateAuth, voteLinkController);

//Middlewares
app.use(notFound);
app.use(manageError);

//Server:
app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en el puerto ${process.env.PORT}`);
});
