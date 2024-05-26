import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const categories = await prisma.category.findMany();
    return NextResponse.json(
      { message: "all categories", categories },
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
export async function POST(req) {
  try {
    const categoryData = await req.json();
    await prisma.category.create({
      data: categoryData,
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
