import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

/* =========================
   UPDATE SHIFT
========================= */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "user.manage");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;

    const id = Number(params.id);

    const body = await req.json();

    const data = await prisma.shiftSchedule.update({
      where: {
        id,
      },

      data: {
        userId: body.userId,
        shiftTemplateId: body.shiftTemplateId,
        workDate: new Date(body.workDate),
        note: body.note,
        status: body.status,
      },
    });

    return Response.json({
      message: "Cập nhật ca thành công",
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

/* =========================
   DELETE SHIFT
========================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allow = hasPermission(userAuth.permissions, "user.manage");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;

    const id = Number(params.id);

    await prisma.shiftSchedule.delete({
      where: {
        id,
      },
    });

    return Response.json({
      message: "Xóa ca thành công",
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
