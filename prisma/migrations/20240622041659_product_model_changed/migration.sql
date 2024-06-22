/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - Added the required column `image` to the `Product_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "feature_image" TEXT[];

-- AlterTable
ALTER TABLE "Product_details" ADD COLUMN     "image" VARCHAR(200) NOT NULL;
