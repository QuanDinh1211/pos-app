import { NextResponse } from "next/server";
import {
  validateLoginCredentials,
  authenticateUser,
  generateAuthResponse,
} from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate input
    const validation = validateLoginCredentials(username, password);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.error },
        { status: 400 },
      );
    }

    // Authenticate user
    const user = await authenticateUser(username, password);

    if (!user) {
      return NextResponse.json(
        { message: "Tài khoản hoặc mật khẩu không chính xác" },
        { status: 401 },
      );
    }

    // Generate auth response
    const { token, user: userData } = generateAuthResponse(user);

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user: userData,
      },
      { status: 200 },
    );

    // Set secure HTTP-only cookie
    response.cookies.set("pos-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Lỗi server. Vui lòng thử lại sau" },
      { status: 500 },
    );
  }
}
