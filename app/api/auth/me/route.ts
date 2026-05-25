import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userAuth.id },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    const permissions =
      user.role?.permissions.map((item) => item.permission.code) || [];

    return NextResponse.json(
      {
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          roleId: user.roleId,
          storeId: user.storeId,
          role: user.role?.code,
          permissions,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get user error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 },
    );
  }
}
