import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = parseInt(params.id);
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        product_details: true,
      },
    });

    return NextResponse.json(
      { message: "product fetched", product },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
