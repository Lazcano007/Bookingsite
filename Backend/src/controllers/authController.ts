import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const registerUser = async (req: Request, res: Response) => {

    try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "You have to fill all the fields"});
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match"});
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        return res.status(400).json({ message: "This user already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, email, password: hashedPassword});

    res.status(201).json({_id: newUser._id, name: newUser.name, email: newUser.email, token: generateToken((newUser._id as string).toString())});
    } catch (error) {
        res.status(500).json({message: "Theres been a server error", error});
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email})
        if(!user) {
            return res.status(400).json({message: "Wrong email or password"});
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({message: "Wrong email or password"});
        }
        res.status(200).json({_id: user._id, name: user.name, email: user.email, token: generateToken((user._id as string).toString())});
    } catch (error) {
        res.status(500).json({message: "Theres been a server error", error});
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;
        res.json(user);

    }catch (error) {
        res.status(500).json({message: "Theres been a server error", error});
    }
}