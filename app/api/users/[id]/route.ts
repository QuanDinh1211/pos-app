import { prisma } from "@/lib/prisma";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";
import { hashPassword } from "@/lib/bcrypt";

/* =========================
   UPDATE USER
========================= */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // =========================
    // 1. AUTH
    // =========================
    const userAuth: any = await auth(req);

    if (!userAuth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // =========================
    // 2. PERMISSION CHECK
    // =========================
    const allow = hasPermission(userAuth.permissions, "product.update");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    // =========================
    // 3. GET BODY
    // =========================
    const body = await req.json();

    // =========================
    // 4. CHECK USER EXISTS
    // =========================
    const user = await prisma.user.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // =========================
    // 5. BUILD UPDATE DATA
    // =========================
    const data: any = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      roleId: body.roleId,
      storeId: body.storeId,
      status: body.status,
    };

    // nếu có password thì hash lại
    if (body.password) {
      data.password = await hashPassword(body.password);
    }

    // =========================
    // 6. UPDATE USER
    // =========================
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data,
    });

    // =========================
    // 7. RESPONSE
    // =========================
    return Response.json({
      message: "Cập nhật user thành công",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
