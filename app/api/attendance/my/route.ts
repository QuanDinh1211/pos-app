import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const user: any = await auth(req);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const logs = await prisma.shiftAttendanceLog.findMany({
      where: {
        userId: user.id,
      },
      include: {
        shiftSchedule: {
          include: {
            shiftTemplate: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      data: logs,
    });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
