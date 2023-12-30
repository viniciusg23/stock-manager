import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export interface IRequestWithUser extends Request {
  authentication?: string | jwt.JwtPayload;
}

export const authMiddleware = (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const jwtSecret = config.get<string>("jwt");
        const decoded = jwt.verify(token, jwtSecret);
        req.authentication = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
