import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const categoryId = parseInt(params.id);
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category)
      return NextResponse.json(
        { message: "invalid category id" },
        { status: 400 }
      );
    return NextResponse.json(
      { message: "category fetched", data: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
