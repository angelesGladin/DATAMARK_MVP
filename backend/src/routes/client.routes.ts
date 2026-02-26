import { Router } from "express";
import { listClients, createClient } from "../controllers/client.controller";

const router = Router();

router.get("/", listClients);
router.post("/", createClient);

export default router;