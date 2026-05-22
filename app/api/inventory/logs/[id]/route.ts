import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
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

    const inventoryId = Number(params.id);

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      return Response.json(
        {
          message: "Inventory not found",
        },
        {
          status: 404,
        },
      );
    }

    const logs = await prisma.inventoryLog.findMany({
      where: {
        inventoryId,
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      message: "Success",

      inventory,

      data: logs,
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
