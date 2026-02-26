/**
 * Rutas de Ventas
 */

import { Router } from "express";
import { createSale } from "../controllers/sale.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// 🔐 Todas las rutas de ventas requieren autenticación
router.use(authMiddleware);

// POST /sales
router.post("/", createSale);

export default router;