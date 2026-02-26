import { prisma } from "../lib/prisma";

type CreateSaleBody = {
  storeId: string;               // ✅ viene del token
  customerId?: string | null;    // ✅ opcional: B2B si viene, B2C si null
  items: Array<{
    productId: string;
    quantity: number;
  }>;
};

export async function createSaleService(body: CreateSaleBody) {
  // 1) Validación mínima
  if (!body?.storeId) {
    const err: any = new Error("storeId es requerido");
    err.statusCode = 400;
    throw err;
  }

  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
    const err: any = new Error("items es requerido y no puede estar vacío");
    err.statusCode = 400;
    throw err;
  }

  // 2) Obtener productos y validar stock (por storeId)
  const productIds = body.items.map((i) => i.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, storeId: body.storeId, isActive: true },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of body.items) {
    const product = productMap.get(item.productId);

    if (!product) {
      const err: any = new Error(`Producto no encontrado: ${item.productId}`);
      err.statusCode = 404;
      throw err;
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      const err: any = new Error(`qty inválido para producto ${item.productId}`);
      err.statusCode = 400;
      throw err;
    }

    if (product.stock < item.quantity) {
      const err: any = new Error(`Stock insuficiente para ${product.name}`);
      err.statusCode = 409;
      err.details = {
        productId: product.id,
        available: product.stock,
        requested: item.quantity,
      };
      throw err;
    }
  }

  // 3) Transacción: crear venta + items + descontar stock
  const sale = await prisma.$transaction(async (tx) => {
    const itemsWithPrices = body.items.map((i) => {
      const p = productMap.get(i.productId)!;
      const unitPrice = p.price;
      const lineTotal = Number(unitPrice) * i.quantity;

      return {
        productId: p.id,
        qty: i.quantity,
        unitPrice,
        lineTotal,
      };
    });

    const total = itemsWithPrices.reduce((acc, it) => acc + Number(it.lineTotal), 0);

    const createdSale = await tx.sale.create({
      data: {
        storeId: body.storeId,                 // ✅ token store
        customerId: body.customerId ?? null,   // ✅ B2B/B2C
        total,
        items: { create: itemsWithPrices },
      },
      include: { items: true },
    });

    // ✅ Descontar stock asegurando storeId
    for (const it of body.items) {
      await tx.product.updateMany({
        where: { id: it.productId, storeId: body.storeId },
        data: { stock: { decrement: it.quantity } },
      });
    }

    return createdSale;
  });

  return sale;
}