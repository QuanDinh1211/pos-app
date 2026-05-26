import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const publicApiRoutes = ["/api/auth/login"];
  const token = req.cookies.get("pos-token")?.value;
  const { pathname } = req.nextUrl;

  // =========================
  // KIỂM TRA TOKEN CÓ TỒN TẠI KHÔNG (KHÔNG VERIFY)
  // Verification sẽ được làm ở auth middleware (Node.js environment)
  // =========================
  const hasToken = !!token;

  const isPublicApi = publicApiRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith("/api/");
  const isLoginPage = pathname === "/login";
  const isHomePage = pathname === "/";

  // =========================
  // API ROUTES - Chỉ check token tồn tại, không verify
  // =========================
  if (isApiRoute && !isPublicApi) {
    if (!hasToken) {
      console.log("❌ No token - 401 Unauthorized", { pathname });
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
  if (hasToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // =========================
  // CHƯA LOGIN - VÀO TRANG BẢO VỀ
  // =========================
  if (!hasToken && isHomePage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
