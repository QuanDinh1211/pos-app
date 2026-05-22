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

    // check đã check-in chưa
    const checkIn = await prisma.shiftAttendanceLog.findFirst({
      where: {
        shiftScheduleId,
        userId: user.id,
        type: "CHECK_IN",
      },
    });

    if (!checkIn) {
      return Response.json({ message: "Bạn chưa check-in" }, { status: 400 });
    }

    // check đã check-out chưa
    const existedOut = await prisma.shiftAttendanceLog.findFirst({
      where: {
        shiftScheduleId,
        userId: user.id,
        type: "CHECK_OUT",
      },
    });

    if (existedOut) {
      return Response.json(
        { message: "Bạn đã check-out rồi" },
        { status: 400 },
      );
    }

    const log = await prisma.shiftAttendanceLog.create({
      data: {
        shiftScheduleId,
        userId: user.id,
        type: "CHECK_OUT",
      },
    });

    return Response.json({
      message: "Check-out thành công",
      data: log,
    });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
