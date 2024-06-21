/*
  Warnings:

  - You are about to drop the column `price` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Banner` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Banner_product_id_key";

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "price",
DROP COLUMN "product_id";
