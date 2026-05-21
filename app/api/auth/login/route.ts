import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return Response.json(
        {
          message: "Tài khoản không tồn tại",
        },
        {
          status: 400,
        },
      );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return Response.json(
        {
          message: "Sai mật khẩu",
        },
        {
          status: 400,
        },
      );
    }

    const permissions =
      user.role?.permissions.map((item: any) => item.permission.code) || [];

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role?.code,
      permissions,
    });

    return Response.json({
      message: "Đăng nhập thành công",
      data: {
        token,
        user: {
          ...user,
          role: {
            ...user.role,
            permissions: permissions,
          },
        },
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
