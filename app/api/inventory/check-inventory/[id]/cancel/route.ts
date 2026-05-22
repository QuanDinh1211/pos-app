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

    const checkId = Number(params.id);

    const result = await prisma.$transaction(async (tx) => {
      const check = await tx.inventoryCheck.findUnique({
        where: {
          id: checkId,
        },

        include: {
          items: true,
        },
      });

      if (!check) {
        throw new Error("Check inventory not found");
      }

      if (check.status === "CANCELED") {
        throw new Error("Already canceled");
      }

      for (const item of check.items) {
        // rollback tồn kho
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
            note: `Cancel Check #${check.code}`,
            createdBy: userAuth.id,
          },
        });
      }

      await tx.inventoryCheck.update({
        where: {
          id: checkId,
        },

        data: {
          status: "CANCELED",
        },
      });

      return check;
    });

    return Response.json({
      message: "Cancel inventory check success",
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
