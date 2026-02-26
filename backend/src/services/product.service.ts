import { prisma } from "../lib/prisma";

export async function getProductsService(storeId: string) {
  const products = await prisma.product.findMany({
    where: {
      storeId,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}