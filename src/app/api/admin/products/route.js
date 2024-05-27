import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "an internal error occured" },
      { status: 500 }
    );
  }
}
