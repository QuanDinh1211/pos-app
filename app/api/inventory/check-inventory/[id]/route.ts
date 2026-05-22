import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const checkId = Number(params.id);

    const data = await prisma.inventoryCheck.findUnique({
      where: {
        id: checkId,
      },

      include: {
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    if (!data) {
      return Response.json(
        {
          message: "Check inventory not found",
        },
        {
          status: 404,
        },
      );
    }

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
