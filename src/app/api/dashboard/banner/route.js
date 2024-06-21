import { imageUploadLocal } from "@/utils/imageUploader";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const bannerTitle = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("img");

    if (!file) {
      return NextResponse.json(
        { message: "image is not provided" },
        { status: 400 }
      );
    }

    const upload = await imageUploadLocal(file);

    if (!upload.fileTypeCheckResult) {
      return NextResponse.json(
        { message: "incorrect image file format" },
        { status: 400 }
      );
    }

    const banner = await prisma.banner.create({
      data: {
        title: bannerTitle,
        short_des: description,
        image: upload.uploadDir,
      },
    });

    return NextResponse.json({ message: "banner created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
