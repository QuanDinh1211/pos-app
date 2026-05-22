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

    const type = searchParams.get("type");
    const inventoryId = searchParams.get("inventoryId");
    const createdBy = searchParams.get("createdBy");

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 20);

    const skip = (page - 1) * limit;

    const where: any = {
      ...(type
        ? {
            type,
          }
        : {}),

      ...(inventoryId
        ? {
            inventoryId: Number(inventoryId),
          }
        : {}),

      ...(createdBy
        ? {
            createdBy: Number(createdBy),
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      prisma.inventoryLog.findMany({
        where,

        include: {
          inventory: true,
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.inventoryLog.count({
        where,
      }),
    ]);

    return Response.json({
      message: "Success",

      data,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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
