import { Request, Response } from "express";
import User from "../models/userModel";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import Booking from "../models/bookingModel";  
import mongoose from "mongoose";

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

    const hashedPassword = await hashPassword(password);
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

        const isCorrectPassword = await verifyPassword(password, user.password);
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


//--------ADMIN----------

export const getAllUser = async (req: Request, res:Response ) => {
    try{
        const users = await User.find({}, "-password") //den tar itne med lösenordet
        res.status(200).json(users);
    }catch(error) {
        return res.status(500).json({message: "Theres beena an error fetching all user"})
    }
};


export const updateUser = async (req:Request, res:Response) => {
    try {

        const {id} = req.params;
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({message: "You have to write a new name"})
        }

        const updatedUser = await User.findByIdAndUpdate(id, {name}, {new: true, select: "-password"});
        if(!updatedUser) {
            return res.status(404).json({message: "This user is not found"});
        }
        res.status(200).json({message: "This user has been successfilly updated", user: updatedUser})

    } catch(error) {
        return res.status(500).json({message: "Theres been an error fetching all user"})
    }
}


export const deleteUser = async (req:Request, res: Response) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).json({message: "This user is not found"})
        }

        const deletedBookings = await Booking.deleteMany({userId: new mongoose.Types.ObjectId(id)});
        res.status(200).json({message: "You successfully deleted this user and their bookings", deletedUser, deletedBookingsCount: deletedBookings?.deletedCount ?? 0})
    }catch (error) {
        return res.status(500).json({message: "Theres been an error deleting user"})
    }
}