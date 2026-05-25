import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("pos-token")?.value;
  const { pathname } = req.nextUrl;

  // =========================
  // KIỂM TRA TOKEN CÓ LỆ HỢP LỆ KHÔNG
  // =========================
  let isValidToken = false;
  if (token) {
    try {
      verifyToken(token);
      isValidToken = true;
    } catch (error) {
      isValidToken = false;
    }
  }

  const isApiRoute = pathname.startsWith("/api/");
  const isLoginPage = pathname === "/dang-nhap";
  const isHomePage = pathname === "/";

  // =========================
  // API ROUTES
  // =========================
  if (isApiRoute) {
    if (!isValidToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Inject token vào Authorization header
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("authorization", `Bearer ${token}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // =========================
  // ĐÃ LOGIN - KHÔNG VÀO LOGIN PAGE
  // =========================
  if (isValidToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // =========================
  // CHƯA LOGIN - VÀO TRANG BẢO VỆ
  // =========================
  if (!isValidToken && isHomePage) {
    return NextResponse.redirect(new URL("/dang-nhap", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
