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

    const data = await prisma.inventoryImport.findUnique({
      where: { id: Number(params.id) },
      include: {
        items: {
          include: {
            import: true,
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
