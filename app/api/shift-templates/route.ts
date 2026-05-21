import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

/* =========================
   CREATE SHIFT TEMPLATE
========================= */
export async function POST(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "user.manage");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const shift = await prisma.shiftTemplate.create({
      data: {
        storeId: body.storeId,
        code: body.code,
        name: body.name,
        startTime: body.startTime,
        endTime: body.endTime,
        color: body.color,
      },
    });

    return Response.json({
      message: "Tạo ca thành công",
      data: shift,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}

/* =========================
   GET SHIFT TEMPLATE LIST
========================= */
export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "user.manage");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    const storeId = searchParams.get("storeId");

    const data = await prisma.shiftTemplate.findMany({
      where: {
        ...(storeId
          ? {
              storeId: Number(storeId),
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
