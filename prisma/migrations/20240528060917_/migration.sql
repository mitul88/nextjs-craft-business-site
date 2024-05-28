/*
  Warnings:

  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Product_slider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product_slider" DROP CONSTRAINT "Product_slider_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount",
DROP COLUMN "discount_price",
DROP COLUMN "star",
ALTER COLUMN "stock" SET DEFAULT true;

-- DropTable
DROP TABLE "Product_slider";

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "short_des" VARCHAR(200) NOT NULL,
    "price" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Banner_product_id_key" ON "Banner"("product_id");
