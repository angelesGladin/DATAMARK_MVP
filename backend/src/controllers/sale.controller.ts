import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { createSaleService } from "../services/sale.service";

type CreateSaleBody = {
  customerId?: string | null;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
};

type CreateSaleServiceDTO = {
  storeId: string;
  customerId?: string | null;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
};

export const createSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = (req as any).user.storeId;
    const body = req.body as CreateSaleBody;

    if (body.customerId) {
      const exists = await prisma.customer.findFirst({
        where: { id: body.customerId, storeId },
        select: { id: true },
      });

      if (!exists) {
        return res.status(400).json({ message: "customerId no pertenece a esta tienda" });
      }
    }

    const result = await createSaleService({
      storeId,
      customerId: body.customerId ?? null,
      items: body.items,
    } as CreateSaleServiceDTO);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};