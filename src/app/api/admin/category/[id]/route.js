import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const categoryId = parseInt(params.id);
  const formData = await req.formData();
  const name = formData.get("name");
  const file = formData.get("img");
  try {
    if (!file) {
      await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name: name,
        },
      });
      return NextResponse.json(
        { message: "category updated without img" },
        { status: 200 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    const uploadDir = path.join(process.cwd(), "public/uploads/" + filename);

    await writeFile(uploadDir, buffer);
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    const previousImgPath = category.img;
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name,
        img: uploadDir,
      },
    });
    fs.unlink(previousImgPath, (err) => {
      if (err) {
        throw err;
      }
    });
    return NextResponse.json({ message: "category updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal error occured" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const categoryId = parseInt(params.id);
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    const imgPath = category.img;
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    if (imgPath) {
      fs.unlink(imgPath, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    return NextResponse.json({ message: "category deleted" });
  } catch (err) {
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}
