import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email y password requeridos" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.isActive) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = signToken({
    userId: user.id,
    storeId: user.storeId,
    role: user.role,
  });

  return res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role, storeId: user.storeId },
  });
};