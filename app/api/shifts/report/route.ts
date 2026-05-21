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

    const data = await prisma.shiftSchedule.findMany({
      where: {
        ...(userId ? { userId: Number(userId) } : {}),
        workDate: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      include: {
        user: true,
        shiftTemplate: true,
      },
      orderBy: {
        workDate: "asc",
      },
    });

    // group summary
    const summary = data.reduce((acc: any, item) => {
      const key = item.userId || "unknown";

      if (!acc[key]) {
        acc[key] = {
          userId: item.userId,
          user: item.user,
          totalShifts: 0,
        };
      }

      acc[key].totalShifts += 1;

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
