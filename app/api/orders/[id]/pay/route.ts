import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function POST(
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

    const body = await req.json();

    const orderId = Number(params.id);

    const { paymentMethod, transactionCode } = body;

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId,
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

          payments: true,
        },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.paymentStatus === "PAID") {
        throw new Error("Order already paid");
      }

      // =========================
      // UPDATE ORDER
      // =========================

      await tx.order.update({
        where: {
          id: order.id,
        },

        data: {
          paymentMethod,

          paymentStatus: "PAID",

          orderStatus: "COMPLETED",
        },
      });

      // =========================
      // UPDATE PAYMENT
      // =========================

      await tx.payment.updateMany({
        where: {
          orderId: order.id,
        },

        data: {
          paymentMethod,

          transactionCode,

          status: "PAID",

          paidAt: new Date(),
        },
      });

      // =========================
      // AUTO EXPORT INVENTORY
      // =========================

      for (const item of order.items) {
        if (!item.product) {
          continue;
        }

        for (const recipe of item.product.recipes) {
          const exportQty = recipe.quantity * item.quantity;

          // trừ kho
          await tx.inventory.update({
            where: {
              id: recipe.inventoryId,
            },

            data: {
              quantity: {
                decrement: exportQty,
              },
            },
          });

          // log
          await tx.inventoryLog.create({
            data: {
              inventoryId: recipe.inventoryId,

              type: "EXPORT",

              quantity: exportQty,

              note: `Auto export from order ${order.orderCode}`,

              createdBy: userAuth.id,
            },
          });
        }
      }

      // =========================
      // CASH LOG
      // =========================

      if (paymentMethod === "CASH") {
        await tx.cashTransaction.create({
          data: {
            storeId: order.storeId,

            shiftId: order.shiftId,

            userId: userAuth.id,

            type: "IN",

            amount: order.totalAmount,

            category: "BUY_ICE",

            reason: `Thanh toán order ${order.orderCode}`,
          },
        });
      }

      return order;
    });

    return Response.json({
      message: "Payment success",
      data: result,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: error instanceof Error ? error.message : "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
