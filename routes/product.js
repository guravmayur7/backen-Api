import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
  removeRelatedImage,
} from "./../controllers/product.js";
import multer from "multer";
import { verifyAdminToken } from "./../middleware/Admin.js";

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
const multipleUpload = upload.fields([
  { name: "main_image", maxCount: 1 },
  { name: "related_images", maxCount: 6 },
]);

const router = express.Router();
//admin routes
router.post("/add-product", verifyAdminToken, multipleUpload, addProduct);

router.get("/get-product", verifyAdminToken, getProducts);
router.get("/get-product/:id", verifyAdminToken, getProductById);
router.put(
  "/update-product/:id",
  verifyAdminToken,
  multipleUpload,
  updateProduct
);
router.get(
  "/remove-related-image/:id/:imageIndex",
  verifyAdminToken,
  removeRelatedImage
);
//admin routes end
export default router;
