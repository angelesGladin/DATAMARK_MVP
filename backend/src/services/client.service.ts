import { prisma } from "../lib/prisma";

const CLIENT_SELECT = {
  id: true,
  storeId: true,
  name: true,
  email: true,
  phone: true,
  documentId: true,
  notes: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export async function listClients(storeId: string) {
  return prisma.client.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
    select: CLIENT_SELECT,
  });
}

export async function createClient(storeId: string, body: any) {
  const name = String(body?.name ?? "").trim();
  if (!name) {
    throw new Error("Nombre requerido");
  }

  return prisma.client.create({
    data: {
      storeId,
      name,
      email: body?.email ? String(body.email).trim() : null,
      phone: body?.phone ? String(body.phone).trim() : null,
      documentId: body?.documentId ? String(body.documentId).trim() : null,
      notes: body?.notes ? String(body.notes).trim() : null,
      isActive: body?.isActive ?? true,
    },
    select: CLIENT_SELECT,
  });
}