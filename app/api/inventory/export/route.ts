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
      let totalCost = 0;

      const exportReceipt = await tx.inventoryExport.create({
        data: {
          storeId,
          userId: userAuth.id,
          note,
          code: `EXP-${Date.now()}`,
          items: {
            create: await Promise.all(
              items.map(async (it: any) => {
                const inventory = await tx.inventory.findUnique({
                  where: { id: it.inventoryId },
                });

                if (!inventory) {
                  throw new Error("Inventory not found");
                }

                const unitCost = inventory.costPrice || 0;
                const itemTotal = unitCost * it.quantity;

                totalCost += itemTotal;

                // 🔥 trừ kho
                await tx.inventory.update({
                  where: { id: it.inventoryId },
                  data: {
                    quantity: {
                      decrement: it.quantity,
                    },
                  },
                });

                // 🔥 log EXPORT
                await tx.inventoryLog.create({
                  data: {
                    inventoryId: it.inventoryId,
                    type: "EXPORT",
                    quantity: -it.quantity,
                    note: `Export #${it.inventoryId}`,
                    createdBy: userAuth.id,
                  },
                });

                return {
                  inventoryId: it.inventoryId,
                  quantity: it.quantity,
                  unitCost,
                  totalCost: itemTotal,
                };
              }),
            ),
          },
        },
      });

      // update total cost
      await tx.inventoryExport.update({
        where: { id: exportReceipt.id },
        data: {
          totalCost,
        },
      });

      return exportReceipt;
    });

    return Response.json({
      message: "Export success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");

    const data = await prisma.inventoryExport.findMany({
      where: {
        ...(status
          ? {
              status,
            }
          : {}),
      },

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
