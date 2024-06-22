import { imageUploadLocal, multiImageUploadLocal } from "@/utils/imageUploader";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const formData = await req.formData();
  const title = formData.get("title");
  const short_des = formData.get("short_des");
  const cost = formData.get("cost");
  const price = formData.get("price");
  const inventory = formData.get("inventory");
  const remark = formData.get("remark");
  const category_id = formData.get("category_id");
  const supplier_id = formData.get("supplier_id");
  const featureImage = formData.get("feature_img");

  const des = formData.get("des");
  const color = formData.get("color");
  const size = formData.get("size");
  const multiImages = formData.get("image");

  try {
    if (
      !title ||
      !cost ||
      !price ||
      category_id ||
      supplier_id ||
      featureImage
    ) {
      return NextResponse.json(
        {
          message:
            "title, price, category id, supplier id, feature image and cost required",
        },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { message: "image is not provided" },
        { status: 400 }
      );
    }

    // single image upload
    const imageUpload = await imageUploadLocal(featureImage);

    if (!imageUpload.fileTypeCheckResult) {
      return NextResponse.json(
        { message: "incorrect image file format" },
        { status: 400 }
      );
    }

    // multiple image upload
    let multiUploadResult;
    if (multiImages) {
      let images = [];
      for (let data of formData) {
        if (data[0] === "image") {
          images.push(data[1]);
        }
      }
      if (images.length !== 0) {
        multiUploadResult = await multiImageUploadLocal(images);
      }
    }

    const product = await prisma.client.create({
      data: {
        title: title,
        short_des: short_des?.short_des,
        cost: cost?.cost,
        price: price?.price,
        inventory: inventory?.inventory,
        remark: remark?.remarks,
        category_id: category_id?.category_id,
        feature_image: imageUpload.uploadDir,
      },
    });

    const product_details = await prisma.product_details.create({
      data: {
        product_id: product.id,
        des: des?.des,
        color: color?.color,
        size: size?.size,
        image: multiImages?.multiUploadResult["imgDirArr"],
      },
    });

    return NextResponse.json({ message: "product created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
