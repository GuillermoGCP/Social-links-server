import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/"); // Directorio donde se guardarán las fotos de perfil
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const limits = {
  fileSize: 3 * 1024 * 1024, // Maximo archivos de 3 megabytes.
};

export { storage, limits };
