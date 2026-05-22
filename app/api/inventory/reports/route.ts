import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return Response.json(
        {
          message: "startDate and endDate are required",
        },
        {
          status: 400,
        },
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // =========================
    // INVENTORY LIST
    // =========================

    const inventories = await prisma.inventory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const result = [];

    for (const inventory of inventories) {
      // =========================
      // TỒN ĐẦU
      // =========================

      const beforeLogs = await prisma.inventoryLog.findMany({
        where: {
          inventoryId: inventory.id,

          createdAt: {
            lt: start,
          },
        },
      });

      let openingStock = 0;

      for (const log of beforeLogs) {
        if (log.type === "IMPORT") {
          openingStock += log.quantity;
        }

        if (log.type === "EXPORT") {
          openingStock -= log.quantity;
        }

        if (log.type === "ADJUST") {
          openingStock += log.quantity;
        }
      }

      // =========================
      // LOG TRONG KỲ
      // =========================

      const logs = await prisma.inventoryLog.findMany({
        where: {
          inventoryId: inventory.id,

          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });

      let importQty = 0;
      let exportQty = 0;
      let adjustQty = 0;

      for (const log of logs) {
        if (log.type === "IMPORT") {
          importQty += log.quantity;
        }

        if (log.type === "EXPORT") {
          exportQty += log.quantity;
        }

        if (log.type === "ADJUST") {
          adjustQty += log.quantity;
        }
      }

      // =========================
      // TỒN CUỐI
      // =========================

      const closingStock = openingStock + importQty - exportQty + adjustQty;

      result.push({
        inventoryId: inventory.id,

        inventoryName: inventory.name,

        unit: inventory.unit,

        openingStock,

        importQty,

        exportQty,

        adjustQty,

        closingStock,

        costPrice: inventory.costPrice,

        inventoryValue: closingStock * inventory.costPrice,
      });
    }

    // =========================
    // TOTAL VALUE
    // =========================

    const totalInventoryValue = result.reduce(
      (sum, item) => sum + item.inventoryValue,
      0,
    );

    return Response.json({
      message: "Success",

      data: result,

      summary: {
        totalInventoryValue,
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
