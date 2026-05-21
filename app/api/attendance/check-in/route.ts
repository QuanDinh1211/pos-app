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
      return Response.json(
        { message: "Không có ca làm hôm nay" },
        { status: 400 },
      );
    }

    // 🔥 CHECK ATTENDANCE EXIST
    const existed = await prisma.shiftAttendance.findFirst({
      where: {
        shiftScheduleId: schedule.id,
      },
    });

    if (existed) {
      return Response.json({ message: "Bạn đã check-in rồi" }, { status: 400 });
    }

    const attendance = await prisma.shiftAttendance.create({
      data: {
        shiftScheduleId: schedule.id,
        checkInAt: new Date(),
        status: "PRESENT",
      },
    });

    return Response.json({
      message: "Check-in thành công",
      data: attendance,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
