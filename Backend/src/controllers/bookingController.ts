import { Request, Response } from "express";
import Booking from "../models/bookingModel";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;

        const {serviceTitle, price, date, time } = req.body;

        if (!serviceTitle || !price || !date|| !time) {
            return res.status(400).json({ message: "You have to choose a date and time" });
        }

        const existingBooking = await Booking.findOne({ date, time });
        if (existingBooking) {
            return res.status(400).json({ message: "This date and time is already booked" });
        };

        const newBooking = await Booking.create({ userId: user._id, serviceTitle, price, date, time});
        res.status(201).json({message: "booking created successfuly", booking: newBooking});

    } catch (error) {
        res.status(500).json({message: "Theres been an error with your booking creation", error});
    }

};


export const  getUserBookings = async (req: Request, res: Response) => {
    try{
        const user = (req as AuthenticatedRequest).user;
        if (!user) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        const bookings = await Booking.find({ userId: user._id}).sort({date: 1, time: 1});
        res.json(bookings);
    }catch (error) {
        res.status(500).json({message: "Theres been an error fetching user bookings", error});
    }
} 