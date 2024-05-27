import { passwordHelper } from "@/utils/passwordHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req, res) {
  try {
    const userData = await req.json();
    const userPassword = userData["password"];
    const userRole = userData["role"];
    if (!userData["email"] || !userData["password"]) {
      return NextResponse.json(
        { message: "please provide all required information" },
        { status: 400 }
      );
    }
    const hashedPassword = await passwordHelper.hashPassword(userPassword);
    await prisma.user.create({
      data: {
        email: userData["email"],
        password: hashedPassword,
        role: userRole?.toUpperCase(),
      },
    });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
