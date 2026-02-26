import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error("❌ Error:", err);

  const status = err.statusCode || 500;

  res.status(status).json({
    ok: false,
    message: err.message || "Internal server error",
    details: err.details || undefined,
  });
}