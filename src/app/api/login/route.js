import { JWThelper } from "@/utils/JWTherlper";
import { passwordHelper } from "@/utils/passwordHelper";

const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const credentials = await req.json();
    const email = credentials.email;
    const password = credentials.password;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    const validUser = await passwordHelper.verifyPassword(
      password,
      user.password
    );
    if (!validUser) {
      return NextResponse.json(
        { message: "incorrect password" },
        { status: 400 }
      );
    } else {
      let token = await JWThelper.generateJWT(user);
      let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookieString = `token=${token}; expires=${expireDuration.toUTCString()} ; httpOnly=true; path=/`;
      return NextResponse.json(
        { message: "login successfull" },
        {
          status: 200,
          headers: {
            "set-cookie": cookieString,
          },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
