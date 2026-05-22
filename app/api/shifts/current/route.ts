import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const storeId = searchParams.get("storeId");

    const shift = await prisma.shift.findFirst({
      where: {
        storeId: Number(storeId),
        status: "OPEN",
      },

      include: {
        user: true,
        shiftSchedule: true,
      },
    });

    return Response.json({
      message: "Success",
      data: shift,
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
