/*
  Warnings:

  - You are about to alter the column `feature_image` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - The `image` column on the `Product_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "feature_image" SET NOT NULL,
ALTER COLUMN "feature_image" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "Product_details" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
