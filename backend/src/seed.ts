import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Crear store demo
  const store = await prisma.store.upsert({
    where: { id: "demo-store-id" },
    update: {},
    create: {
      id: "demo-store-id",
      name: "DATAMARK Demo Store",
      city: "Lima",
    },
  });

  // Hash password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Crear usuario admin
  await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      email: "admin@demo.com",
      password: hashedPassword,
      role: "admin",
      storeId: store.id,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });