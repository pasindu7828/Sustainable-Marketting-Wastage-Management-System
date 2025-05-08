import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "D:/Sustainable/Sustainable-Marketting-Wastage-Management-System/frontend/public/uploads/reviews");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

export const upload = multer({ storage });
