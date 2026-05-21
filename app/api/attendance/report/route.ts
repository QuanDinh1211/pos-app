import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const user: any = await auth(req);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const userId = searchParams.get("userId");

    const data = await prisma.shiftAttendance.findMany({
      where: {
        shiftSchedule: {
          ...(userId ? { userId: Number(userId) } : {}),
          workDate: {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
          },
        },
      },
      include: {
        shiftSchedule: {
          include: {
            user: true,
            shiftTemplate: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // summary
    const summary = data.reduce((acc: any, item) => {
      const schedule = item.shiftSchedule;
      const userId = schedule?.userId;

      // Bỏ qua nếu không có userId
      if (!userId) {
        return acc;
      }

      if (!acc[userId]) {
        acc[userId] = {
          userId,
          user: schedule?.user,
          present: 0,
          absent: 0,
          late: 0,
        };
      }

      if (item.status === "PRESENT") acc[userId].present += 1;
      if (item.status === "ABSENT") acc[userId].absent += 1;
      if (item.status === "LATE") acc[userId].late += 1;

      return acc;
    }, {});

    return Response.json({
      message: "OK",
      data,
      summary: Object.values(summary),
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
