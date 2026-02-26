import { prisma } from "../lib/prisma";

export async function getAccountsService(storeId: string, type?: string) {
  return prisma.customer.findMany({
    where: {
      storeId,
      ...(type ? { type } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createAccountService(storeId: string, data: any) {
  return prisma.customer.create({
    data: {
      storeId,
      ...data,
      creditLimit: data.creditLimit ?? 0,
      currentBalance: data.currentBalance ?? 0,
    },
  });
}

export async function updateAccountService(id: string, data: any) {
  return prisma.customer.update({
    where: { id },
    data,
  });
}

export async function deleteAccountService(id: string) {
  return prisma.customer.delete({
    where: { id },
  });
}