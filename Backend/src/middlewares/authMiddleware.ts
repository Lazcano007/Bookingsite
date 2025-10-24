import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export interface AuthenticatedRequest extends Request {
    user?: any;
}


export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }    
    
    if(!token) {
        return res.status(401).json({message: "You are not authorized, no token"});
    }
        
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(401).json({ message: "JWT sercret is not set"});
        }
        const decoded = jwt.verify(token, secret) as { id: string, role: string };

        const user = await User.findById(decoded.id).select("name email role").lean();
        if(!user) {
            return res.status(401).json({message: "user not found"});
        }
        req.user = user;
        req.user.role = decoded.role || user.role;
        next();
    } catch (error) {
        return res.status(401).json({message: "You are not authorized, token failed"});
    }
}


export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(req.user && req.user.role ==="admin") {
        next();
    }else {
        res.status(403).json({message: "This is only for admin"});
    }
}