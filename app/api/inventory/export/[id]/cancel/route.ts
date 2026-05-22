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

    const exportId = Number(params.id);

    const result = await prisma.$transaction(async (tx) => {
      const receipt = await tx.inventoryExport.findUnique({
        where: {
          id: exportId,
        },

        include: {
          items: true,
        },
      });

      if (!receipt) {
        throw new Error("Export not found");
      }

      if (receipt.status === "CANCELED") {
        throw new Error("Export already canceled");
      }

      // =========================
      // ROLLBACK KHO
      // =========================

      for (const item of receipt.items) {
        await tx.inventory.update({
          where: {
            id: item.inventoryId,
          },

          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });

        // log inventory
        await tx.inventoryLog.create({
          data: {
            inventoryId: item.inventoryId,
            type: "ADJUST",
            quantity: item.quantity,
            note: `Cancel Export #${receipt.code}`,
            createdBy: userAuth.id,
          },
        });
      }

      // =========================
      // UPDATE STATUS
      // =========================

      await tx.inventoryExport.update({
        where: {
          id: exportId,
        },

        data: {
          status: "CANCELED",
        },
      });

      return receipt;
    });

    return Response.json({
      message: "Cancel export success",
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
