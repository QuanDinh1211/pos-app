import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

export async function POST(req: Request) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "user.manage");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    /*
      data: [
        {
          storeId,
          userId,
          shiftTemplateId,
          workDate
        }
      ]
    */

    const dataInsert = body.data.map((item: any) => ({
      storeId: item.storeId,
      userId: item.userId,
      shiftTemplateId: item.shiftTemplateId,
      workDate: new Date(item.workDate),
      createdBy: userAuth.id,
    }));

    await prisma.shiftSchedule.createMany({
      data: dataInsert,
      skipDuplicates: true,
    });

    return Response.json({
      message: "Phân ca hàng loạt thành công",
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
