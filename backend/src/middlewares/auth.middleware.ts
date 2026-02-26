import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = header.replace("Bearer ", "").trim();

  try {
    const payload = verifyToken(token);
    (req as any).user = payload; // guardamos userId/storeId/role
    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}