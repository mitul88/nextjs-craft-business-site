import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const limit = searchParams.get("limit") || 10;
    const page = searchParams.get("page");
    const orderBy = searchParams.get("orderBy") || "desc";

    const produtcs = await prisma.product.findMany({
      take: parseInt(limit),
      skip: (page - 1) * limit,
      orderBy: {
        created_at: orderBy,
      },
    });
    return NextResponse.json(
      { message: "all produtcs", produtcs },
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
