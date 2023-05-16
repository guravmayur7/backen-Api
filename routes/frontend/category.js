import express from "express";
import { getCategory } from "./../../controllers/frontend/category.js";
//import multer from "multer";
// import { verifyAdminToken } from "./../middleware/Admin.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./assets/category_images/");
//   },
//   filename: function (req, file, cb) {
//     const re = /(?:\.([^.]+))?$/;
//     const ext = re.exec(file.originalname)[1]; // "txt"
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "." + ext);
//   },
// });

// const upload = multer({ storage: storage });
// const multipleUpload = upload.fields([
//   { name: "list_image" },
//   { name: "menu_image" },
// ]);

const router = express.Router();
//frontend routes
router.get("/get-categories", getCategory);
//frontend routes end
export default router;
