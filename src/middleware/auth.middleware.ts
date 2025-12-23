import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const authMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log(token)
      const decoded = jwt.verify(
        token as string,
        config.user_secret_key as string
      ) as JwtPayload;
      req.user = decoded;
      console.log(decoded);
      if (!roles.includes(decoded.roll)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default authMiddleware;
