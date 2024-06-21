const { imageUploadLocal } = require("@/utils/imageUploader");
const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");
const fs = require("fs");

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const bannerId = parseInt(params.id);
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const file = formData.get("image");

  try {
    const banner = await prisma.banner.findUnique({
      where: {
        id: bannerId,
      },
    });

    if (!banner)
      return NextResponse.json(
        { message: "invalid banner id" },
        { status: 400 }
      );

    if (!file) {
      await prisma.banner.update({
        where: {
          id: bannerId,
        },
        data: {
          title: title,
          short_des: description,
        },
      });
      return NextResponse.json(
        { message: "banner name updated" },
        { status: 200 }
      );
    }

    const upload = await imageUploadLocal(file);

    if (!upload.fileTypeCheckResult) {
      return NextResponse.json(
        { message: "incorrect image file format" },
        { status: 400 }
      );
    }
    const prevImgPath = banner.image;

    await prisma.banner.update({
      where: {
        id: bannerId,
      },
      data: {
        title: title?.title,
        description: description?.description,
        image: upload.uploadDir,
      },
    });
    fs.unlink(prevImgPath, (err) => {
      if (err) {
        throw err;
      }
    });
    return NextResponse.json({ message: "banner updated!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const bannerId = parseInt(params["id"]);
  try {
    const banner = await prisma.banner.findUnique({
      where: {
        id: bannerId,
      },
    });
    if (!banner) {
      return NextResponse.json({
        message: "banner with this ID does'nt exist",
      });
    }
    const prevImgPath = banner.image;
    await prisma.banner.delete({
      where: {
        id: bannerId,
      },
    });
    if (prevImgPath) {
      fs.unlink(prevImgPath, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    return NextResponse.json({ message: "banner deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}
