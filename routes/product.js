import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./../controllers/product.js";
import multer from "multer";
import { verifyAdminToken } from "./../middleware/Admin.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/product/");
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
router.post("/add-product", verifyAdminToken, addProduct);

router.get("/get-product", verifyAdminToken, getProducts);
router.get("/get-product/:id", verifyAdminToken, getProductById);

router.post("/update-product", verifyAdminToken, updateProduct);
//admin routes end
export default router;
