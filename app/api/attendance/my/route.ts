import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const user: any = await auth(req);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.shiftAttendance.findMany({
      where: {
        shiftSchedule: {
          userId: user.id,
        },
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
      message: "OK",
      data,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
