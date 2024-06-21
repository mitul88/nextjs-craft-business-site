/*
  Warnings:

  - A unique constraint covering the columns `[supplier_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cost` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventory` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "inventory" INTEGER NOT NULL,
ADD COLUMN     "supplier_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "contact_person" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(200) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "comments" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_supplier_id_key" ON "Product"("supplier_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
