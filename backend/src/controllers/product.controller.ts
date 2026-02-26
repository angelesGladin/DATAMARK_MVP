/**
 * Controlador de Productos
 * Aquí vive la lógica de negocio
 */

import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { getProductsService } from "../services/product.service";

/**
 * GET /products
 * Devuelve todos los productos de una tienda
 */
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = (req as any).user.storeId;
    const products = await getProductsService(storeId);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const storeId = (req as any).user.storeId;

    //  ahora sí incluimos sku / barcode / isActive
    const { name, sku, barcode, category, cost, price, stock, isActive } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "name y category son requeridos" });
    }

    const product = await prisma.product.create({
      data: {
        storeId,
        name,
        category,

        // GUARDA SKU (y barcode si viene)
        sku: sku ?? null,
        barcode: barcode ?? null,

        // Prisma Decimal: si te llegan strings, conviértelos
        cost: cost !== undefined && cost !== null ? Number(cost) : 0,
        price: price !== undefined && price !== null ? Number(price) : 0,

        stock: stock !== undefined && stock !== null ? Number(stock) : 0,

        // si no lo mandas, default true
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creando producto:", error);
    return res.status(500).json({ message: "Error al crear producto" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sku, barcode, category, cost, price, stock, isActive } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,

        // también permite actualizar sku/barcode si quieres
        sku: sku ?? undefined,
        barcode: barcode ?? undefined,

        cost: cost !== undefined ? Number(cost) : undefined,
        price: price !== undefined ? Number(price) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,

        isActive,
      },
    });

    return res.json(product);
  } catch (error) {
    console.error("Error actualizando producto:", error);
    return res.status(500).json({ message: "Error al actualizar producto" });
  }
};

export const deactivateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    return res.json(product);
  } catch (error) {
    console.error("Error desactivando producto:", error);
    return res.status(500).json({ message: "Error al desactivar producto" });
  }
};
