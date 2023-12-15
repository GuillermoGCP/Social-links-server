import multer from "multer";

import { storage, limits } from "../utils/index.js";

import {
  editProfileController,
  getProfile,
  login,
  register,
  patchProfileController,
} from "../controllers/users/index.js";

import { validateAuth } from "../middlewares/index.js";
import express from "express";

const router = express.Router();
const upload = multer({ storage: storage, limits });

// Rutas:
router.post("/login", login);
router.post("/register", register);

//Ruta para Editar todo el Perfil (con foto)
router.put(
  "/profile",
  validateAuth,
  upload.single("profilePicture"),
  editProfileController
);
//Ruta para Editar partes concretas del perfil (sin foto):
router.patch("/profile/patch", validateAuth, patchProfileController);

//Ruta visualizar perfil y links propios
router.get("/profile", validateAuth, getProfile);

export default router;
