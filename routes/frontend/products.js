import express from "express";
import { getAllProducts } from "./../../controllers/frontend/product.js";

const router = express.Router();
//frontend routes
router.get("/get-all-products", getAllProducts);
//frontend routes end
export default router;
