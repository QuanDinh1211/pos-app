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
      data: {
        ...product,
        toppings: product.toppings.map((item) => item.topping),
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
        code: body.sku,

        slug:
          body.slug ||
          body.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-"),

        image: body.image,

        description: body.description,

        basePrice: Number(body.basePrice || 0),

        costPrice: Number(body.costPrice || 0),

        status: body.status,

        // RESET TOPPING
        toppings: {
          deleteMany: {},

          create:
            body.toppings?.map((item: any) => ({
              toppingId: Number(item.toppingId),
            })) || [],
        },
      },

      include: {
        category: true,

        sizes: true,

        toppings: {
          select: {
            topping: true,
          },
        },
      },
    });

    const data = {
      ...product,

      toppings: product.toppings.map((item) => item.topping),
    };

    return Response.json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (error: any) {
    console.log(error);

    // Không tìm thấy product
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

    // Duplicate unique
    if (error.code === "P2002") {
      return Response.json(
        {
          message: "Slug hoặc mã sản phẩm đã tồn tại",
        },
        {
          status: 400,
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
        status: "INACTIVE",
        deletedAt: new Date(),
      },
    });

    return Response.json({
      message: "Xóa sản phẩm thành công",
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
