import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function POST(req: Request) {
  try {
    const user: any = await auth(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { shiftScheduleId } = body;

    if (!shiftScheduleId) {
      return Response.json(
        { message: "Missing shiftScheduleId" },
        { status: 400 },
      );
    }

    // check đã check-in chưa
    const existed = await prisma.shiftAttendanceLog.findFirst({
      where: {
        shiftScheduleId,
        userId: user.id,
        type: "CHECK_IN",
      },
    });

    if (existed) {
      return Response.json({ message: "Bạn đã check-in rồi" }, { status: 400 });
    }

    const log = await prisma.shiftAttendanceLog.create({
      data: {
        shiftScheduleId,
        userId: user.id,
        type: "CHECK_IN",
      },
    });

    return Response.json({
      message: "Check-in thành công",
      data: log,
    });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
