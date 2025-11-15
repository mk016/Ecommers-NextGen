import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env variable");
}

const jwtSecret: string = JWT_SECRET;

export const generateToken = (payload: Record<string, unknown>) => {
  const expiresIn: SignOptions["expiresIn"] =
    (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d";

  return jwt.sign(payload, jwtSecret, {
    expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded === "string") {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
};
