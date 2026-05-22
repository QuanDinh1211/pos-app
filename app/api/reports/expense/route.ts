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

    const data = await prisma.expense.findMany({
      where:
        startDate && endDate
          ? {
              expenseDate: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {},

      orderBy: {
        expenseDate: "desc",
      },
    });

    const totalExpense = data.reduce((sum, item) => sum + item.amount, 0);

    return Response.json({
      message: "Success",

      data,

      summary: {
        totalExpense,
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
