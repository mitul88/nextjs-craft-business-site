import { imageUploadLocal } from "@/utils/imageUploader";
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
  const image = formData.get("image");

  const des = formData.get("des");
  const color = formData.get("color");
  const size = formData.get("size");
  const img1 = formData.get("img1");
  const img2 = formData.get("img2");
  const img3 = formData.get("img3");
  const img4 = formData.get("img4");
  const img5 = formData.get("img5");
  const img6 = formData.get("img6");
  const img7 = formData.get("img7");
  const img8 = formData.get("img8");

  try {
    if (!title || !cost || !price || category_id) {
      return NextResponse.json(
        { message: "title, price, category id and cost required" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { message: "image is not provided" },
        { status: 400 }
      );
    }

    const imageUpload = await imageUploadLocal(image);

    if (!imageUpload.fileTypeCheckResult) {
      return NextResponse.json(
        { message: "incorrect image file format" },
        { status: 400 }
      );
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
        image: imageUpload.uploadDir,
      },
    });

    const product_details = await prisma.product_details.create({
      data: {
        product_id: product.id,
        des: des?.des,
        color: color?.color,
        size: size?.size,
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
