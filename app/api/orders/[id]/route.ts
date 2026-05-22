import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
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

    const orderId = Number(params.id);

    const data = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        store: true,

        customer: true,

        voucher: true,

        table: true,

        user: true,

        shift: true,

        items: {
          include: {
            product: true,

            toppings: {
              include: {
                topping: true,
              },
            },
          },
        },

        payments: true,
      },
    });

    if (!data) {
      return Response.json(
        {
          message: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

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
