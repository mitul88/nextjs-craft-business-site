import { NextResponse } from "next/server";
import { authMiddleware } from "./app/middleware/api/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export default async function middleware(req) {
  const authResult = await authMiddleware(req);
  if (!authResult?.isValid && req.url.includes("/api/dashboard")) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}
