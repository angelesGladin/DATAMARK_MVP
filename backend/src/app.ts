/**
 * Configuración principal de Express
 */

import express, { Request, Response } from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import saleRoutes from "./routes/sale.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import accountRoutes from "./routes/account.routes";
import clientRoutes from "./routes/client.routes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use("/auth", authRoutes);

  // Health check
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      service: "datamark-backend",
      timestamp: new Date().toISOString(),
    });
  });

  // Rutas del negocio
  app.use("/products", productRoutes);
  app.use("/sales", saleRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/accounts", accountRoutes);
  app.use("/clients", clientRoutes);

  // Si ninguna ruta coincidió
  app.use(notFoundMiddleware);

  // Si algo lanzó error
  app.use(errorMiddleware);

  return app;
  
}
