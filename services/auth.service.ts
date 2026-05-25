import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

const CREDENTIALS_REGEX = /^[a-zA-Z0-9_]{3,}$/;
const PASSWORD_MIN_LENGTH = 6;

export const validateLoginCredentials = (
  username: string,
  password: string,
): { valid: boolean; error?: string } => {
  if (!username || !password) {
    return { valid: false, error: "Tài khoản và mật khẩu không được để trống" };
  }

  if (username.length < 3) {
    return { valid: false, error: "Tài khoản phải có ít nhất 3 ký tự" };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      error: `Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự`,
    };
  }

  return { valid: true };
};

export const authenticateUser = async (
  username: string,
  password: string,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
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
      return null;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export const generateAuthResponse = (user: any) => {
  const permissions =
    user.role?.permissions.map((item: any) => item.permission.code) || [];

  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role?.code,
    permissions,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      roleId: user.roleId,
      storeId: user.storeId,
      role: user.role?.code,
      permissions,
    },
  };
};
