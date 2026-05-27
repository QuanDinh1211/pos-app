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

    // Xử lý toppings
    const productToppingCreates = [];

    if (body.toppings && Array.isArray(body.toppings)) {
      for (const t of body.toppings) {
        if (t.id === null || t.id === undefined) {
          // === TẠO MỚI TOPPING ===
          productToppingCreates.push({
            topping: {
              create: {
                name: t.name,
                price: t.price || 0,
                image: t.image || null,
                stock: t.stock || 0,
                status: t.status || "ACTIVE",
              },
            },
          });
        } else {
          // === CONNECT TOPPING ĐÃ TỒN TẠI ===
          productToppingCreates.push({
            topping: {
              connect: { id: t.id },
            },
          });
        }
      }
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        code: body.sku,
        slug:
          body.slug ||
          body.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
            .trim()
            .replace(/\s+/g, "-"),
        category: body.category
          ? { connect: { id: Number(body.category) } }
          : undefined,
        image: body.image,
        description: body.description,
        basePrice: Number(body.price) || 0,
        costPrice: Number(body.costPrice) || 0,
        status: body.active ? "ACTIVE" : "INACTIVE",

        // Toppings - xử lý create cho join model ProductTopping
        toppings: productToppingCreates.length
          ? { create: productToppingCreates }
          : undefined,
      },

      include: {
        category: true,
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
    console.error(error);

    if (error.code === "P2002") {
      return Response.json(
        { message: "Slug hoặc SKU đã tồn tại" },
        { status: 400 },
      );
    }

    return Response.json({ message: "Server Error" }, { status: 500 });
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

    const categoryIdsRaw = searchParams.getAll("categoryId");
    const categoryIds = categoryIdsRaw
      .map((c) => Number(c))
      .filter((n) => !Number.isNaN(n));

    // pagination
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const pageSize = Math.max(
      1,
      Math.min(100, Number(searchParams.get("pageSize") || 20)),
    );

    const status = searchParams.get("status");

    // build where clause
    const where: any = {
      deletedAt: null,
      ...(keyword
        ? {
            name: {
              contains: keyword,
            },
          }
        : {}),
      ...(categoryIds.length
        ? {
            categoryId: { in: categoryIds },
          }
        : {}),
      ...(status && status !== "-1"
        ? {
            status,
          }
        : {}),
    };

    const total = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        sizes: true,
        toppings: {
          select: {
            topping: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const data = products.map((product) => ({
      ...product,
      toppings: product.toppings.map((item) => item.topping),
    }));

    return Response.json({
      message: "Success",
      data,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
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
