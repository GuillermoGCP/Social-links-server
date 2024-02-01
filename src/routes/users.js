import multer from "multer";

import { storage, limits, fileFilter } from "../utils/index.js";

import {
  getProfile,
  login,
  register,
  patchProfileController,
  resetPassController,
} from "../controllers/users/index.js";

import { validateAuth } from "../middlewares/index.js";
import express from "express";
import checkPass from "../controllers/pass/checkPass.js";

const router = express.Router();
const upload = multer({ storage: storage, limits, fileFilter });

// Rutas:
router.post("/login", login);
router.post("/register", register);

router.post("/resetPass", resetPassController);
router.post("/checkPass", checkPass);

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
