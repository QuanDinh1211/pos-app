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

    const where: any = {
      paymentStatus: "PAID",

      ...(startDate && endDate
        ? {
            createdAt: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }
        : {}),
    };

    const orders = await prisma.order.findMany({
      where,
    });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    const totalOrders = orders.length;

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const cashRevenue = orders
      .filter((x) => x.paymentMethod === "CASH")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const transferRevenue = orders
      .filter((x) => x.paymentMethod === "TRANSFER")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const cardRevenue = orders
      .filter((x) => x.paymentMethod === "CARD")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    return Response.json({
      message: "Success",

      data: {
        totalRevenue,

        totalOrders,

        avgOrderValue,

        cashRevenue,

        transferRevenue,

        cardRevenue,
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
