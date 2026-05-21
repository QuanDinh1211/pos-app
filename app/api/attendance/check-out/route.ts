import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function POST(req: Request) {
  try {
    const user: any = await auth(req);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const schedule = await prisma.shiftSchedule.findFirst({
      where: {
        userId: user.id,
        workDate: today,
      },
    });

    if (!schedule) {
      return Response.json({ message: "Không tìm thấy ca" }, { status: 400 });
    }

    const attendance = await prisma.shiftAttendance.findFirst({
      where: {
        shiftScheduleId: schedule.id,
      },
    });

    if (!attendance) {
      return Response.json({ message: "Chưa check-in" }, { status: 400 });
    }

    const updated = await prisma.shiftAttendance.update({
      where: {
        id: attendance.id,
      },
      data: {
        checkOutAt: new Date(),
      },
    });

    return Response.json({
      message: "Check-out thành công",
      data: updated,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
