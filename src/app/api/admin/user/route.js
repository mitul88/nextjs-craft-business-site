import { JWThelper } from "@/utils/JWTherlper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req, res) {
  try {
    const userData = req.json();
    await prisma.user.create({
      data: {
        email: userData["email"],
        password: userData["password"],
        role: userData["role"],
      },
    });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
