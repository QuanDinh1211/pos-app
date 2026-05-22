// app/api/expenses/route.ts

import { ExpenseType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

/* =========================
   CREATE EXPENSE
========================= */
export async function POST(req: Request) {
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

    const allow = hasPermission(userAuth.permissions, "expense.create");

    if (!allow) {
      return Response.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    const body = await req.json();

    if (!body.title) {
      return Response.json(
        {
          message: "Tên chi phí không được để trống",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.amount || Number(body.amount) <= 0) {
      return Response.json(
        {
          message: "Số tiền không hợp lệ",
        },
        {
          status: 400,
        },
      );
    }

    const expense = await prisma.$transaction(async (tx) => {
      // =========================
      // CREATE EXPENSE
      // =========================

      const createdExpense = await tx.expense.create({
        data: {
          storeId: body.storeId,
          userId: userAuth.id,

          type: body.type,

          title: body.title,

          amount: Number(body.amount),

          note: body.note,

          status: "DONE",

          expenseDate: body.expenseDate
            ? new Date(body.expenseDate)
            : new Date(),
        },
      });

      // =========================
      // CASH TRANSACTION
      // =========================

      await tx.cashTransaction.create({
        data: {
          storeId: body.storeId,

          userId: userAuth.id,

          type: "OUT",

          amount: Number(body.amount),

          category: "EXPENSE",

          reason: body.title,
        },
      });

      // =========================
      // ACTIVITY LOG
      // =========================

      await tx.activityLog.create({
        data: {
          userId: userAuth.id,

          action: "CREATE",

          entity: "EXPENSE",

          entityId: createdExpense.id,

          newData: createdExpense as any,
        },
      });

      return createdExpense;
    });

    return Response.json({
      message: "Tạo chi phí thành công",
      data: expense,
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

/* =========================
   GET EXPENSES
========================= */
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

    const storeId = searchParams.get("storeId");

    const type = searchParams.get("type");

    const status = searchParams.get("status");

    const startDate = searchParams.get("startDate");

    const endDate = searchParams.get("endDate");

    const data = await prisma.expense.findMany({
      where: {
        ...(storeId ? { storeId: Number(storeId) } : {}),

        ...(type
          ? {
              type: type as ExpenseType,
            }
          : {}),

        ...(status
          ? {
              status: status as string,
            }
          : {}),

        ...(startDate && endDate
          ? {
              expenseDate: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {}),
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },

        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

    return Response.json({
      message: "Success",

      summary: {
        totalAmount,
        totalItems: data.length,
      },

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
