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

    const orders = await prisma.order.findMany({
      where: {
        paymentStatus: "PAID",

        ...(startDate && endDate
          ? {
              createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {}),
      },

      include: {
        items: {
          include: {
            product: {
              include: {
                recipes: {
                  include: {
                    inventory: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // =========================
    // REVENUE
    // =========================

    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // =========================
    // COGS
    // =========================

    let cogs = 0;

    for (const order of orders) {
      for (const item of order.items) {
        if (!item.product) {
          continue;
        }

        for (const recipe of item.product.recipes) {
          cogs += recipe.quantity * recipe.inventory.costPrice * item.quantity;
        }
      }
    }

    // =========================
    // EXPENSE
    // =========================

    const expenses = await prisma.expense.findMany({
      where:
        startDate && endDate
          ? {
              expenseDate: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {},
    });

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    // =========================
    // PROFIT
    // =========================

    const grossProfit = revenue - cogs;

    const netProfit = grossProfit - totalExpense;

    return Response.json({
      message: "Success",

      data: {
        revenue,

        cogs,

        grossProfit,

        totalExpense,

        netProfit,
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
