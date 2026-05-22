import { prisma } from "@/lib/prisma";

import { auth } from "@/middlewares/auth";

import { hasPermission } from "@/middlewares/permission";

export async function POST(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "product.create");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        categoryId: body.categoryId,

        name: body.name,

        slug: body.slug,

        image: body.image,

        description: body.description,

        basePrice: body.basePrice || 0,

        costPrice: body.costPrice || 0,

        isCombo: body.isCombo || false,

        status: body.status || "ACTIVE",

        // PRODUCT SIZE
        sizes: {
          create:
            body.sizes?.map((item: any) => ({
              sizeName: item.sizeName,
              price: item.price,
            })) || [],
        },

        // TOPPING
        toppings: {
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
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error: any) {
    console.log(error);

    if (error.code === "P2002") {
      return Response.json(
        {
          message: "Slug đã tồn tại",
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

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword") || "";

    const categoryId = searchParams.get("categoryId");

    const data = await prisma.product.findMany({
      where: {
        deletedAt: null,

        ...(keyword
          ? {
              name: {
                contains: keyword,
              },
            }
          : {}),

        ...(categoryId
          ? {
              categoryId: Number(categoryId),
            }
          : {}),
      },

      include: {
        category: true,
        sizes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

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
