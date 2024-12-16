import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  
  const token =req.cookies.get("accessToken")?.value || ""; 

  console.log("Token from cookies:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
