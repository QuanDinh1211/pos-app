import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

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

    const body = await req.json();

    const { storeId, customerId, voucherId, tableId, shiftId, note, items } =
      body;

    if (!items || items.length === 0) {
      return Response.json(
        {
          message: "Items is required",
        },
        {
          status: 400,
        },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      let subtotal = 0;

      // =========================
      // PREPARE ITEMS
      // =========================

      const itemData: any[] = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        let price = product.basePrice;

        // size
        if (item.productSizeId) {
          const size = await tx.productSize.findUnique({
            where: {
              id: item.productSizeId,
            },
          });

          if (size) {
            price = size.price;
          }
        }

        // toppings
        let toppingTotal = 0;

        const toppingsData: any[] = [];

        if (item.toppings && item.toppings.length > 0) {
          for (const toppingItem of item.toppings) {
            const topping = await tx.topping.findUnique({
              where: {
                id: toppingItem.toppingId,
              },
            });

            if (!topping) {
              continue;
            }

            toppingTotal += topping.price;

            toppingsData.push({
              toppingId: topping.id,
              toppingName: topping.name,
              price: topping.price,
            });
          }
        }

        const finalPrice = price + toppingTotal;

        const totalPrice = finalPrice * item.quantity;

        subtotal += totalPrice;

        itemData.push({
          productId: product.id,
          productName: product.name,

          sizeName: item.sizeName,

          quantity: item.quantity,

          price: finalPrice,

          totalPrice,

          note: item.note,

          toppings: toppingsData,
        });
      }

      // =========================
      // VOUCHER
      // =========================

      let discountAmount = 0;

      if (voucherId) {
        const voucher = await tx.voucher.findUnique({
          where: {
            id: voucherId,
          },
        });

        if (voucher && voucher.isActive) {
          if (subtotal >= voucher.minOrderAmount) {
            if (voucher.discountType === "PERCENT") {
              discountAmount = Math.floor(
                (subtotal * voucher.discountValue) / 100,
              );

              if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
                discountAmount = voucher.maxDiscount;
              }
            }

            if (voucher.discountType === "FIXED") {
              discountAmount = voucher.discountValue;
            }
          }
        }
      }

      // =========================
      // TOTAL
      // =========================

      const taxAmount = 0;

      const totalAmount = subtotal - discountAmount + taxAmount;

      // =========================
      // CREATE ORDER
      // =========================

      const order = await tx.order.create({
        data: {
          storeId,
          userId: userAuth.id,
          customerId,
          voucherId,
          tableId,
          shiftId,

          orderCode: `ORD-${Date.now()}`,

          subtotal,
          discountAmount,
          taxAmount,
          totalAmount,

          note,

          orderStatus: "PENDING",
          paymentStatus: "PENDING",
        },
      });

      // =========================
      // CREATE ITEMS
      // =========================

      for (const item of itemData) {
        const orderItem = await tx.orderItem.create({
          data: {
            orderId: order.id,

            productId: item.productId,

            productName: item.productName,

            sizeName: item.sizeName,

            quantity: item.quantity,

            price: item.price,

            totalPrice: item.totalPrice,

            note: item.note,
          },
        });

        // toppings
        if (item.toppings.length > 0) {
          await tx.orderItemTopping.createMany({
            data: item.toppings.map((topping: any) => ({
              orderItemId: orderItem.id,

              toppingId: topping.toppingId,

              toppingName: topping.toppingName,

              price: topping.price,
            })),
          });
        }
      }

      // =========================
      // CREATE PAYMENT
      // =========================

      await tx.payment.create({
        data: {
          orderId: order.id,

          amount: totalAmount,

          status: "PENDING",
        },
      });

      return order;
    });

    return Response.json({
      message: "Create order success",
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
