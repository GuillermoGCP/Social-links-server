import multer from "multer";

import { storage, limits } from "../utils/index.js";

import {
  editProfileController,
  login,
  register,
} from "../controllers/users/index.js";

import { validateAuth } from "../middlewares/index.js";
import express from "express";

const router = express.Router();
const upload = multer({ storage: storage, limits });

// Rutas:
router.post("/login", login);
router.post("/register", register);

//Ruta de Editar Perfil
router.put(
  "/profile",
  validateAuth,
  upload.single("profilePicture"),
  editProfileController
);

export default router;
