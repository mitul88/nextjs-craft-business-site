import { NextResponse } from "next/server";
import { JWThelper } from "./utils/JWTherlper";

export async function middleware(req, res) {
  // Security check for API endpoint
  if (req.nextUrl.pathname.startsWith("/api/dashboard")) {
    try {
      let token = req.cookies.get("token");
      if (!token) {
        return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
      }
      let payload = await JWThelper.verifyJWT(token["value"]);
      if (!payload) {
        return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
      }
      const requestHeader = new Headers(req.headers);
      requestHeader.set("email", payload["email"]);
      requestHeader.set("id", payload["id"]);
      return NextResponse.next({
        request: { headers: requestHeader },
      });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ message: "internal error" });
    }
  }
}
