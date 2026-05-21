import { verifyToken } from "@/lib/jwt";

export const auth = async (req: Request) => {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      return null;
    }

    const token = authorization.split(" ")[1];

    const decoded = verifyToken(token);

    return decoded;
  } catch (error) {
    return null;
  }
};
