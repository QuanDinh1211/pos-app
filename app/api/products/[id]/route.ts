import { prisma } from "@/lib/prisma";

import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const params = await context.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      },

      include: {
        category: true,

        sizes: true,

        toppings: {
          include: {
            topping: true,
          },
        },

        recipes: {
          include: {
            inventory: true,
          },
        },
      },
    });

    if (!product) {
      return Response.json(
        {
          message: "Sản phẩm không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Success",
      data: product,
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "product.update");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const params = await context.params;

    const product = await prisma.product.update({
      where: {
        id: Number(params.id),
      },

      data: {
        categoryId: body.categoryId,

        name: body.name,

        slug: body.slug,

        image: body.image,

        description: body.description,

        basePrice: body.basePrice,

        costPrice: body.costPrice,

        status: body.status,

        // RESET SIZE
        sizes: {
          deleteMany: {},

          create:
            body.sizes?.map((item: any) => ({
              sizeName: item.sizeName,
              price: item.price,
            })) || [],
        },

        // RESET TOPPING
        toppings: {
          deleteMany: {},

          create:
            body.toppings?.map((item: any) => ({
              toppingId: item.toppingId,
            })) || [],
        },
      },

      include: {
        category: true,
        sizes: true,

        toppings: {
          include: {
            topping: true,
          },
        },
      },
    });

    return Response.json({
      message: "Cập nhật thành công",
      data: product,
    });
  } catch (error: any) {
    console.log(error);

    if (error.code === "P2025") {
      return Response.json(
        {
          message: "Sản phẩm không tồn tại",
        },
        {
          status: 404,
        },
      );
    }

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

export async function DELETE(req: Request, { params }: any) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "product.delete");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.product.update({
      where: {
        id: Number(params.id),
      },

      data: {
        deletedAt: new Date(),
      },
    });

    return Response.json({
      message: "Xóa sản phẩm thành công",
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
