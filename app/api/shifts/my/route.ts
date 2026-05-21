import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(req.url);

    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const startDate = new Date(Number(year), Number(month) - 1, 1);

    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    const data = await prisma.shiftSchedule.findMany({
      where: {
        userId: userAuth.id,

        workDate: {
          gte: startDate,
          lte: endDate,
        },
      },

      include: {
        shiftTemplate: true,
      },

      orderBy: {
        workDate: "asc",
      },
    });

    return Response.json({
      message: "Success",
      data,
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
