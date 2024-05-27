import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const categoryName = formData.get("name");
    const file = formData.get("img");

    if (!file) {
      return NextResponse.json(
        { message: "image is not provided" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    const uploadDir = path.join(process.cwd(), "public/uploads/" + filename);

    await writeFile(uploadDir, buffer);
    await prisma.category.create({
      data: {
        name: categoryName,
        img: uploadDir,
      },
    });
    return NextResponse.json({ message: "category created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
