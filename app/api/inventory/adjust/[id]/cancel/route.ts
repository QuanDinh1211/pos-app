import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const adjustId = Number(params.id);

    const result = await prisma.$transaction(async (tx) => {
      const adjust = await tx.inventoryAdjust.findUnique({
        where: {
          id: adjustId,
        },

        include: {
          items: true,
        },
      });

      if (!adjust) {
        throw new Error("Adjust not found");
      }

      if (adjust.status === "CANCELED") {
        throw new Error("Already canceled");
      }

      for (const item of adjust.items) {
        // rollback quantity
        await tx.inventory.update({
          where: {
            id: item.inventoryId,
          },

          data: {
            quantity: item.systemQuantity,
          },
        });

        // log
        await tx.inventoryLog.create({
          data: {
            inventoryId: item.inventoryId,
            type: "ADJUST",
            quantity: -item.difference,
            note: `Cancel Adjust #${adjust.code}`,
            createdBy: userAuth.id,
          },
        });
      }

      await tx.inventoryAdjust.update({
        where: {
          id: adjustId,
        },

        data: {
          status: "CANCELED",
        },
      });

      return adjust;
    });

    return Response.json({
      message: "Cancel adjust success",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: error instanceof Error ? error.message : "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
