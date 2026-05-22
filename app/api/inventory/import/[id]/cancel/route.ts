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

    const importId = Number(params.id);

    const result = await prisma.$transaction(async (tx) => {
      const receipt = await tx.inventoryImport.findUnique({
        where: { id: importId },
        include: { items: true },
      });

      if (!receipt) {
        throw new Error("Import not found");
      }

      if (receipt.status === "CANCELED") {
        throw new Error("Already canceled");
      }

      // =========================
      // 1. ROLLBACK QUANTITY
      // =========================
      for (const it of receipt.items) {
        await tx.inventory.update({
          where: { id: it.inventoryId },
          data: {
            quantity: {
              decrement: it.quantity,
            },
          },
        });

        await tx.inventoryLog.create({
          data: {
            inventoryId: it.inventoryId,
            type: "ADJUST",
            quantity: -it.quantity,
            note: `Cancel Import #${receipt.code}`,
            createdBy: userAuth.id,
          },
        });
      }

      // =========================
      // 2. MARK CANCEL
      // =========================
      await tx.inventoryImport.update({
        where: { id: importId },
        data: {
          status: "CANCELED",
        },
      });

      // =========================
      // 3. REBUILD COST PRICE
      // =========================
      const inventoryIds = [
        ...new Set(receipt.items.map((i) => i.inventoryId)),
      ];

      for (const inventoryId of inventoryIds) {
        const inventory = await tx.inventory.findUnique({
          where: { id: inventoryId },
        });

        if (!inventory) continue;

        // tất cả import còn active
        const imports = await tx.inventoryImportItem.findMany({
          where: {
            inventoryId,
            import: {
              status: "DONE",
            },
          },
        });

        let totalQty = 0;
        let totalCost = 0;

        for (const imp of imports) {
          totalQty += imp.quantity;
          totalCost += imp.quantity * imp.unitPrice;
        }

        const newCostPrice =
          totalQty > 0 ? Math.round(totalCost / totalQty) : 0;

        await tx.inventory.update({
          where: { id: inventoryId },
          data: {
            costPrice: newCostPrice,
          },
        });
      }

      return receipt;
    });

    return Response.json({
      message: "Cancel import success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: error instanceof Error ? error.message : "Server Error" },
      { status: 500 },
    );
  }
}
