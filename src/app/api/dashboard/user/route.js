import { passwordHelper } from "@/utils/passwordHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req, res) {
  try {
    const userData = await req.json();
    const userEmail = userData["email"];
    const userPassword = userData["password"];
    const userRole = userData["role"];

    const userExist = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (userExist) {
      return NextResponse.json(
        { message: "user with this email already exists" },
        { status: 400 }
      );
    }
    if (!userData["email"] || !userData["password"]) {
      return NextResponse.json(
        { message: "please provide all required information" },
        { status: 400 }
      );
    }
    const hashedPassword = await passwordHelper.hashPassword(userPassword);
    await prisma.user.create({
      data: {
        email: userEmail,
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
