import express from "express";
import {
  addCategory,
  getCategory,
  getCategoryById,
  UpdateCategory,
} from "./../controllers/category.js";
import multer from "multer";
import { verifyAdminToken } from "./../middleware/Admin.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/category_images/");
  },
  filename: function (req, file, cb) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(file.originalname)[1]; // "txt"
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: "list_image" },
  { name: "menu_image" },
]);

const router = express.Router();
//admin routes
router.post("/add-category", verifyAdminToken, multipleUpload, addCategory);
router.get("/get-categories", verifyAdminToken, getCategory);
router.get("/get-category/:id", verifyAdminToken, getCategoryById);

router.post(
  "/update-category",
  verifyAdminToken,
  upload.single("list_image"),
  upload.single("menu_image"),
  UpdateCategory
);
//admin routes end
export default router;
