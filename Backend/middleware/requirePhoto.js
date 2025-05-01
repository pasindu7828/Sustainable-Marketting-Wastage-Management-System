import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "C:/Users/NIMSARA/Desktop/ITP project nimshara/Sustainable-Marketting-Wastage-Management-System/frontend/public/uploads/reviews");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

export const upload = multer({ storage });
