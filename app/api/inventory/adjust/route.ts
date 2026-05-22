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
      const adjust = await tx.inventoryAdjust.create({
        data: {
          storeId,
          userId: userAuth.id,
          note,
          code: `ADJ-${Date.now()}`,

          items: {
            create: [],
          },
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

        // update tồn kho thực tế
        await tx.inventory.update({
          where: {
            id: item.inventoryId,
          },

          data: {
            quantity: actualQuantity,
          },
        });

        // create adjust item
        await tx.inventoryAdjustItem.create({
          data: {
            adjustId: adjust.id,
            inventoryId: item.inventoryId,
            systemQuantity,
            actualQuantity,
            difference,
            note: item.note,
          },
        });

        // inventory log
        await tx.inventoryLog.create({
          data: {
            inventoryId: item.inventoryId,
            type: "ADJUST",
            quantity: difference,
            note: `Adjust #${adjust.code}`,
            createdBy: userAuth.id,
          },
        });
      }

      return adjust;
    });

    return Response.json({
      message: "Adjust success",
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

    const data = await prisma.inventoryAdjust.findMany({
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
