import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

export async function POST(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "shift.close");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const shift = await prisma.shift.findUnique({
      where: {
        id: body.shiftId,
      },

      include: {
        orders: true,
      },
    });

    if (!shift) {
      return Response.json(
        {
          message: "Ca không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    if (shift.status === "CLOSED") {
      return Response.json(
        {
          message: "Ca đã đóng",
        },
        {
          status: 400,
        },
      );
    }

    // CHECK OWNER SHIFT
    // OPTIONAL

    if (shift.userId !== userAuth.id) {
      return Response.json(
        {
          message: "Bạn không thể đóng ca của người khác",
        },
        {
          status: 403,
        },
      );
    }

    // CASH ORDERS
    const totalCashOrders = shift.orders
      .filter(
        (item: any) =>
          item.paymentMethod === "CASH" && item.status === "COMPLETED",
      )
      .reduce((sum: number, item: any) => sum + item.total, 0);

    const expectedCash = shift.startCash + totalCashOrders;

    const actualCash = body.actualCash || 0;

    const differenceCash = actualCash - expectedCash;

    // NOTE REQUIRED IF DIFFERENCE BIG
    if (Math.abs(differenceCash) >= 200000 && !body.note) {
      return Response.json(
        {
          message: "Vui lòng nhập lý do chênh lệch quỹ",
        },
        {
          status: 400,
        },
      );
    }

    const updatedShift = await prisma.shift.update({
      where: {
        id: shift.id,
      },

      data: {
        actualCash,
        expectedCash,
        differenceCash,

        endCash: actualCash,

        endedAt: new Date(),

        note: body.note,

        status: "CLOSED",
      },

      include: {
        user: true,
      },
    });

    return Response.json({
      message: "Đóng ca thành công",
      data: updatedShift,
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
