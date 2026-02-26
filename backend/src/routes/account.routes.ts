import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAccounts, createAccount, updateAccount, deleteAccount } from "../controllers/account.controller";

const router = Router();

// protegido (B2B SaaS)
router.use(authMiddleware);

router.get("/", getAccounts);
router.post("/", createAccount);
router.patch("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;