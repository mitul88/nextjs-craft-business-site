-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EDITOR', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Product_remark" AS ENUM ('POPULAR', 'NEW', 'TOP', 'SPECIAL', 'TRENDING', 'REGULAR');

-- CreateEnum
CREATE TYPE "Policies_type" AS ENUM ('ABOUT', 'REFUND', 'TERMS', 'CONTACT', 'COMPLAIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_profile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(150) NOT NULL,
    "fax" VARCHAR(150) NOT NULL,
    "add" VARCHAR(150) NOT NULL,
    "postcode" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "img" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "short_des" VARCHAR(500) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" BOOLEAN NOT NULL,
    "discount_price" DOUBLE PRECISION NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "stock" BOOLEAN NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,
    "remark" "Product_remark" NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_details" (
    "id" SERIAL NOT NULL,
    "img1" VARCHAR(200) NOT NULL,
    "img2" VARCHAR(200) NOT NULL,
    "img3" VARCHAR(200) NOT NULL,
    "img4" VARCHAR(200) NOT NULL,
    "img5" VARCHAR(200) NOT NULL,
    "img6" VARCHAR(200) NOT NULL,
    "img7" VARCHAR(200) NOT NULL,
    "img8" VARCHAR(200) NOT NULL,
    "des" TEXT NOT NULL,
    "color" VARCHAR(200) NOT NULL,
    "size" VARCHAR(200) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_slider" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "short_des" VARCHAR(200) NOT NULL,
    "price" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "type" "Policies_type" NOT NULL,
    "des" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(300) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_user_id_key" ON "User_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_details_product_id_key" ON "Product_details"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slider_product_id_key" ON "Product_slider"("product_id");

-- AddForeignKey
ALTER TABLE "User_profile" ADD CONSTRAINT "User_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_details" ADD CONSTRAINT "Product_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_slider" ADD CONSTRAINT "Product_slider_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
