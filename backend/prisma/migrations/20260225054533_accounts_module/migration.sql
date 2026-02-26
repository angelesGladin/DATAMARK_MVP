-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "creditLimit" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "currentBalance" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentType" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'B2C',
ALTER COLUMN "fullName" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Customer_storeId_idx" ON "Customer"("storeId");

-- CreateIndex
CREATE INDEX "Customer_documentNumber_idx" ON "Customer"("documentNumber");
