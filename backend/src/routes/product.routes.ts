/**
 * Rutas de Productos
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
} from "../controllers/product.controller";

const router = Router();

// ✅ Protege todas las rutas de productos
router.use(authMiddleware);

// GET /products
router.get("/", getProducts);

// POST /products
router.post("/", createProduct);

// PUT /products/:id
router.put("/:id", updateProduct);

// DELETE /products/:id
router.delete("/:id", deactivateProduct);

export default router;