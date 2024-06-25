const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  try {
    const supplier = await prisma.supplier.create({
      data: data,
    });
    return NextResponse.json(
      { message: "supplier created", data: supplier },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal error occured" },
      { status: 500 }
    );
  }
}
