import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

export async function POST(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "shift.open");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    // CHECK OPEN SHIFT
    const existingShift = await prisma.shift.findFirst({
      where: {
        storeId: body.storeId,
        status: "OPEN",
      },
    });

    if (existingShift) {
      return Response.json(
        {
          message: "Cửa hàng đang có ca hoạt động",
        },
        {
          status: 400,
        },
      );
    }

    // OPTIONAL:
    // CHECK SHIFT SCHEDULE

    if (body.shiftScheduleId) {
      const schedule = await prisma.shiftSchedule.findUnique({
        where: {
          id: body.shiftScheduleId,
        },
      });

      if (!schedule) {
        return Response.json(
          {
            message: "Ca làm không tồn tại",
          },
          {
            status: 404,
          },
        );
      }
    }

    const shift = await prisma.shift.create({
      data: {
        storeId: body.storeId,

        userId: userAuth.id,

        shiftScheduleId: body.shiftScheduleId || null,

        startCash: body.startCash || 0,

        expectedCash: body.startCash || 0,

        startedAt: new Date(),

        note: body.note,

        status: "OPEN",
      },

      include: {
        user: true,
        shiftSchedule: true,
      },
    });

    return Response.json({
      message: "Mở ca thành công",
      data: shift,
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
