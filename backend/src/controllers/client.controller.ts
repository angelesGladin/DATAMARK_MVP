import type { Request, Response, NextFunction } from "express";
import * as clientService from "../services/client.service";

const STORE_ID = "demo-store-id";

export async function listClients(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await clientService.listClients(STORE_ID);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function createClient(req: Request, res: Response, next: NextFunction) {
  try {
    const created = await clientService.createClient(STORE_ID, req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}