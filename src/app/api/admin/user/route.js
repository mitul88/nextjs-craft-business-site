import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
