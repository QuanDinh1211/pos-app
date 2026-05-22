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

    const exportId = Number(params.id);

    const data = await prisma.inventoryExport.findUnique({
      where: {
        id: exportId,
      },

      include: {
        items: {
          include: {
            export: true,
          },
        },
      },
    });

    if (!data) {
      return Response.json(
        {
          message: "Export not found",
        },
        {
          status: 404,
        },
      );
    }

    const totalQuantity = data.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    const totalCost = data.items.reduce((sum, item) => sum + item.totalCost, 0);

    return Response.json({
      message: "Success",

      data: {
        ...data,
        totalQuantity,
        totalCost,
      },
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
