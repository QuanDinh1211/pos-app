import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const inventoryId = Number(params.id);

    const data = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
      include: {
        logs: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
        recipes: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!data) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
