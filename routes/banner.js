import express from "express";
import {
  addBanner,
  getBanner,
  getBannerById,
} from "./../controllers/banner.js";
import multer from "multer";
import { verifyAdminToken } from "./../middleware/Admin.js";
//const upload = multer({ dest: "./assets/products/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/products/");
  },
  filename: function (req, file, cb) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(file.originalname)[1]; // "txt"
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
//admin routes
router.post(
  "/add-banner",
  verifyAdminToken,
  upload.single("banner_image"),
  addBanner
);
router.get("/get-banner", verifyAdminToken, getBanner);
router.get("/get-banner/:id", verifyAdminToken, getBannerById);
//admin routes end
export default router;
