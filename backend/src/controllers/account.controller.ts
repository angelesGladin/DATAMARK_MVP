import { Request, Response, NextFunction } from "express";
import {
  getAccountsService,
  createAccountService,
  updateAccountService,
  deleteAccountService,
} from "../services/account.service";

/**
 * GET /accounts?type=B2B|B2C
 */
export const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = (req as any).user.storeId;
    const type = typeof req.query.type === "string" ? req.query.type : undefined;

    const accounts = await getAccountsService(storeId, type);
    return res.json(accounts);
  } catch (e) {
    next(e);
  }
};

/**
 * POST /accounts
 */
export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = (req as any).user.storeId;

    const {
      type = "B2C",
      fullName,
      companyName,
      documentType,
      documentNumber,
      phone,
      email,
      creditLimit,
    } = req.body;

    // Validación mínima para MVP:
    if (type === "B2B" && !companyName) {
      return res.status(400).json({ message: "companyName es requerido para B2B" });
    }
    if (type === "B2C" && !fullName) {
      return res.status(400).json({ message: "fullName es requerido para B2C" });
    }

    const account = await createAccountService(storeId, {
      type,
      fullName: fullName ?? null,
      companyName: companyName ?? null,
      documentType: documentType ?? null,
      documentNumber: documentNumber ?? null,
      phone: phone ?? null,
      email: email ?? null,
      creditLimit: creditLimit !== undefined ? Number(creditLimit) : 0,
    });

    return res.status(201).json(account);
  } catch (e) {
    next(e);
  }
};

/**
 * PATCH /accounts/:id
 */
export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const payload = { ...req.body };

    // Normalizaciones numéricas si vienen
    if (payload.creditLimit !== undefined) payload.creditLimit = Number(payload.creditLimit);
    if (payload.currentBalance !== undefined) payload.currentBalance = Number(payload.currentBalance);

    const updated = await updateAccountService(id, payload);
    return res.json(updated);
  } catch (e) {
    next(e);
  }
};
/**
 * DELETE /accounts/:id
 */
export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteAccountService(id);
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};