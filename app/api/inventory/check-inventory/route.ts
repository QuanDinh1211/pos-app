import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function POST(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { storeId, note, items } = body;

    const result = await prisma.$transaction(async (tx) => {
      const check = await tx.inventoryCheck.create({
        data: {
          storeId,
          userId: userAuth.id,
          note,
          code: `CHECK-${Date.now()}`,
        },
      });

      for (const item of items) {
        const inventory = await tx.inventory.findUnique({
          where: {
            id: item.inventoryId,
          },
        });

        if (!inventory) {
          throw new Error("Inventory not found");
        }

        const systemQuantity = inventory.quantity;

        const actualQuantity = item.actualQuantity;

        const difference = actualQuantity - systemQuantity;

        // update kho thực tế
        await tx.inventory.update({
          where: {
            id: item.inventoryId,
          },

          data: {
            quantity: actualQuantity,
          },
        });

        // create item
        await tx.inventoryCheckItem.create({
          data: {
            checkId: check.id,
            inventoryId: item.inventoryId,
            systemQuantity,
            actualQuantity,
            difference,
            note: item.note,
          },
        });

        // log
        await tx.inventoryLog.create({
          data: {
            inventoryId: item.inventoryId,
            type: "ADJUST",
            quantity: difference,
            note: `Inventory Check #${check.code}`,
            createdBy: userAuth.id,
          },
        });
      }

      return check;
    });

    return Response.json({
      message: "Inventory check success",
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

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.inventoryCheck.findMany({
      include: {
        items: true,
      },

      orderBy: {
        createdAt: "desc",
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
