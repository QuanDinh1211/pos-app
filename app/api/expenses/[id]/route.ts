// app/api/expenses/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

/* =========================
   GET EXPENSE DETAIL
========================= */
export async function GET(req: Request, context: any) {
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

    const id = Number(context.params.id);

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        store: true,
      },
    });

    if (!expense) {
      return Response.json(
        {
          message: "Chi phí không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Success",
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
   UPDATE EXPENSE
========================= */
export async function PUT(req: Request, context: any) {
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

    const allow = hasPermission(userAuth.permissions, "expense.update");

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

    const id = Number(context.params.id);

    const oldExpense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!oldExpense) {
      return Response.json(
        {
          message: "Chi phí không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    const body = await req.json();

    const expense = await prisma.expense.update({
      where: {
        id,
      },

      data: {
        type: body.type,

        title: body.title,

        amount: Number(body.amount),

        note: body.note,

        status: body.status,

        expenseDate: body.expenseDate ? new Date(body.expenseDate) : undefined,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: userAuth.id,

        action: "UPDATE",

        entity: "EXPENSE",

        entityId: expense.id,

        oldData: oldExpense as any,

        newData: expense as any,
      },
    });

    return Response.json({
      message: "Cập nhật chi phí thành công",
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
   DELETE EXPENSE
========================= */
export async function DELETE(req: Request, context: any) {
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

    const allow = hasPermission(userAuth.permissions, "expense.delete");

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

    const id = Number(context.params.id);

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expense) {
      return Response.json(
        {
          message: "Chi phí không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.$transaction(async (tx) => {
      // =========================
      // DELETE EXPENSE
      // =========================

      await tx.expense.delete({
        where: {
          id,
        },
      });

      // =========================
      // CASH LOG REVERSAL
      // =========================

      await tx.cashTransaction.create({
        data: {
          storeId: expense.storeId,

          userId: userAuth.id,

          type: "IN",

          amount: expense.amount,

          category: "EXPENSE",

          reason: `Hủy chi phí #${expense.id}`,
        },
      });

      // =========================
      // ACTIVITY LOG
      // =========================

      await tx.activityLog.create({
        data: {
          userId: userAuth.id,

          action: "DELETE",

          entity: "EXPENSE",

          entityId: expense.id,

          oldData: expense as any,
        },
      });
    });

    return Response.json({
      message: "Xóa chi phí thành công",
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
