import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  userId: string;
  storeId: string;
  role: string;
};

const JWT_SECRET: Secret = (process.env.JWT_SECRET ?? "dev-secret") as Secret;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"];

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}