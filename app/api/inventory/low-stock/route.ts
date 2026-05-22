import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";

export async function GET(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get("storeId");

    const data = await prisma.inventory.findMany({
      where: {
        ...(storeId ? { storeId: Number(storeId) } : {}),
        quantity: {
          lte: prisma.inventory.fields.minQuantity,
        },
      },
      orderBy: {
        quantity: "asc",
      },
    });

    return Response.json({
      message: "Success",
      count: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
