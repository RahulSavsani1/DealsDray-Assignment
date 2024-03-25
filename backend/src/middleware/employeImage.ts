import multer from "multer"
import path from "path"

let storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/employe"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      const imagePath = file.path;

      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only jpeg,  jpg , png"));
    }
  },
  
});

export default upload