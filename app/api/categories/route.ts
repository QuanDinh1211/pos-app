import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      where: {
        deletedAt: null,
      },

      orderBy: {
        sortOrder: "asc",
      },

      select: {
        id: true,

        name: true,

        image: true,

        sortOrder: true,

        status: true,
      },
    });

    return NextResponse.json(
      {
        success: true,

        data: categories,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,

        message: "Lấy danh sách category thất bại",
      },
      {
        status: 500,
      },
    );
  }
}
