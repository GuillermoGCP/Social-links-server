import multer from "multer";

import { storage, limits, fileFilter } from "../utils/index.js";

import {
  getProfile,
  login,
  register,
  patchProfileController,
} from "../controllers/users/index.js";

import { validateAuth } from "../middlewares/index.js";
import express from "express";

const router = express.Router();
const upload = multer({ storage: storage, limits, fileFilter });

// Rutas:
router.post("/login", login);
router.post("/register", register);

//Ruta para Editar el perfil:
router.patch(
  "/profile",
  validateAuth,
  upload.single("profilePicture"),
  patchProfileController
);

//Ruta visualizar perfil y links propios
router.get("/profile", validateAuth, getProfile);

export default router;
