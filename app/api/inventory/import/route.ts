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

      const importReceipt = await tx.inventoryImport.create({
        data: {
          storeId,
          userId: userAuth.id,
          note,
          code: `IMP-${Date.now()}`,
          items: {
            create: await Promise.all(
              items.map(async (it: any) => {
                const inventory = await tx.inventory.findUnique({
                  where: { id: it.inventoryId },
                });

                if (!inventory) {
                  throw new Error("Inventory not found");
                }

                const oldQty = inventory.quantity;
                const oldCost = inventory.costPrice;

                const importQty = it.quantity;
                const importPrice = it.unitPrice;

                // 🔥 tính cost trung bình mới
                const newQty = oldQty + importQty;

                const newCost =
                  newQty === 0
                    ? 0
                    : Math.round(
                        (oldQty * oldCost + importQty * importPrice) / newQty,
                      );

                const itemTotal = importQty * importPrice;
                totalCost += itemTotal;

                // 🔥 update inventory
                await tx.inventory.update({
                  where: { id: it.inventoryId },
                  data: {
                    quantity: newQty,
                    costPrice: newCost, // 👈 QUAN TRỌNG
                  },
                });

                // 🔥 log IMPORT
                await tx.inventoryLog.create({
                  data: {
                    inventoryId: it.inventoryId,
                    type: "IMPORT",
                    quantity: importQty,
                    note: `Import #${it.inventoryId}`,
                    createdBy: userAuth.id,
                  },
                });

                return {
                  inventoryId: it.inventoryId,
                  quantity: importQty,
                  unitCost: importPrice,
                  totalCost: itemTotal,
                };
              }),
            ),
          },
        },
      });

      await tx.inventoryImport.update({
        where: { id: importReceipt.id },
        data: {
          totalCost,
        },
      });

      return importReceipt;
    });

    return Response.json({
      message: "Import success",
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

    const data = await prisma.inventoryImport.findMany({
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
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
