import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { auth } from "@/middlewares/auth";
import { hasPermission } from "@/middlewares/permission";

export async function POST(req: Request) {
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

    const allow = hasPermission(userAuth.permissions, "USER_CREATE");

    if (!allow) {
      return Response.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    const body = await req.json();

    const passwordHash = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        password: passwordHash,
        roleId: body.roleId,
        storeId: body.storeId,
      },
    });

    return Response.json({
      message: "Tạo user thành công",
      data: user,
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

export async function GET(req: Request) {
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
    const allow = hasPermission(userAuth.permissions, "product.view");

    if (!allow) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    // =========================
    // 3. GET USERS
    // =========================
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    // =========================
    // 4. RESPONSE
    // =========================
    return Response.json({
      data: users,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
