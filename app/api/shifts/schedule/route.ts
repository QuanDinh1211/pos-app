import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

/* =========================
   CREATE SHIFT SCHEDULE
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

    const schedule = await prisma.shiftSchedule.create({
      data: {
        storeId: body.storeId,
        userId: body.userId,
        shiftTemplateId: body.shiftTemplateId,
        workDate: new Date(body.workDate),
        note: body.note,
        createdBy: userAuth.id,
      },

      include: {
        user: true,
        shiftTemplate: true,
      },
    });

    return Response.json({
      message: "Phân ca thành công",
      data: schedule,
    });
  } catch (error: any) {
    console.log(error);

    if (error.code === "P2002") {
      return Response.json(
        {
          message: "Nhân viên đã có ca này",
        },
        {
          status: 400,
        },
      );
    }

    return Response.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

/* =========================
   GET SHIFT SCHEDULE
========================= */
export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const userId = searchParams.get("userId");

    const startDate = new Date(Number(year), Number(month) - 1, 1);

    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    const data = await prisma.shiftSchedule.findMany({
      where: {
        workDate: {
          gte: startDate,
          lte: endDate,
        },

        ...(userId
          ? {
              userId: Number(userId),
            }
          : {}),
      },

      include: {
        user: true,
        shiftTemplate: true,
      },

      orderBy: {
        workDate: "asc",
      },
    });

    return Response.json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
