import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const user: any = await auth(req);

    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const userId = searchParams.get("userId");

    if (!from || !to) {
      return Response.json({ message: "Missing from/to" }, { status: 400 });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    // ⚠️ nếu là user thường thì chỉ xem của mình
    const targetUserId =
      user.role === "ADMIN" ? (userId ? Number(userId) : undefined) : user.id;

    const logs = await prisma.shiftAttendanceLog.findMany({
      where: {
        userId: targetUserId,
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      include: {
        shiftSchedule: {
          include: {
            shiftTemplate: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // =========================
    // SUMMARY CALCULATION
    // =========================
    const summary = {
      totalLogs: logs.length,
      checkIn: logs.filter((l) => l.type === "CHECK_IN").length,
      checkOut: logs.filter((l) => l.type === "CHECK_OUT").length,
    };

    return Response.json({
      filter: {
        from,
        to,
        userId: targetUserId,
      },
      summary,
      data: logs,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
