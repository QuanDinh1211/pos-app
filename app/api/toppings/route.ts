import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const toppings = await prisma.topping.findMany({
      where: {
        deletedAt: null,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        name: true,

        image: true,

        price: true,

        stock: true,

        status: true,
      },
    });

    return NextResponse.json(
      {
        success: true,

        data: toppings,
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

        message: "Lấy danh sách topping thất bại",
      },
      {
        status: 500,
      },
    );
  }
}
