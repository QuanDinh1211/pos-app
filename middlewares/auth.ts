import { verifyToken } from "@/lib/jwt";

export const auth = async (req: Request) => {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      console.warn("⚠️ No authorization header");
      return null;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      console.warn("⚠️ No token in authorization header");
      return null;
    }

    try {
      const decoded = verifyToken(token);
      console.log("✅ Token verified in auth middleware");
      return decoded;
    } catch (error: any) {
      console.error("❌ Token verification error:", error.message);
      return null;
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return null;
  }
};
