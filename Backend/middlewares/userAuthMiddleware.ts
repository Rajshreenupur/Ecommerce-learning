import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
// console.log(USER_JWT_SECRET,"njbhgvfcd")
if (!USER_JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authenticateUsers = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  // console.log(token,"<<<<<<<<<<<<")
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(
    token,
    USER_JWT_SECRET,
    (
      err: VerifyErrors | null,
      decoded: Jwt | JwtPayload | string | undefined
    ) => {
      if (err) {

        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      req.user = decoded;
      next();
    }
  );
};
