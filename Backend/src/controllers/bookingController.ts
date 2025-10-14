import { Request, Response } from "express";
import Booking from "../models/bookingModel";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthenticatedRequest).user;  // Hämtar inloggade användaren
        const {title, price, date, time } = req.body;

        if (!title || !price || !date|| !time) {
            return res.status(400).json({ message: "You have to choose a date and time" }); 
        }

        const existingBooking = await Booking.findOne({ date, time, status: "active" });
        if (existingBooking) {
            return res.status(400).json({ message: "This time on this date is already booked" });
        };

        const newBooking = await Booking.create({ userId: user._id, title, price, date, time});
        res.status(201).json({message: "booking created successfuly", booking: newBooking});

    } catch (error) {
        res.status(500).json({message: "Theres been an error with your booking creation", error});
    }

};


// Hämtar alla bokningar för usern som är inloggad
export const getUserBookings = async (req: Request, res: Response) => {
    try{
        const user = (req as AuthenticatedRequest).user;

        const bookings = await Booking.find({ userId: user._id}).sort({date: 1, time: 1});
        res.status(200).json(bookings);
    }catch (error) {
        res.status(500).json({message: "Theres been an error fetching your bookings", error});
    }
} 

export const getBookedTimes = async (req:Request, res: Response) => {
    try {
        const {date} = req.params;
        if(!date) {
            return res.status(400).json({message: "You have to provide a date"});
        }
        const bookings = await Booking.find({date, status: "active"});
        
        const bookedTimes = [...new Set(bookings.map((b)=> b.time))].sort();
        res.status(200).json({date, bookedTimes});
    }catch (error) {
        res.status(500).json({message: "Theres been an error fetching booked times", error});
    }
}

export const cancelBooking = async (req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const booking = await Booking.findByIdAndUpdate(id, { status: "cancelled"}, { new: true});
        
        if (!booking) {
            return res.status(400).json({message: "This booking does not exist"});
        }
        
        res.status(200).json({message: "You have cancelled you booking", booking});
        
    } catch (error) {
        res.status(500).json({message: "Theres been an error cancelling your booking", error});
    }
}

export const getUpcomingBooking = async (req:Request, res:Response ) => {
    
    try {
        const user = ( req as AuthenticatedRequest).user;
        if(!user) 
            return res.status(401).json({message: "You are not authorized"});
        
        const today = new Date();
        
        const allBookings = await Booking.find({ userId: user._id, status: "active"});
        const upcoming = allBookings.filter(b=> new Date(b.date) >= today);

        upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        res.status(200).json(upcoming);
        
    } catch (error) {
        res.status(500).json({message: "Theres been an error fetching upcoming booking", error});
    }
}

export const getBookingHistory = async (req:Request, res:Response ) => { 
    try {
        const user = ( req as AuthenticatedRequest).user;
        if(!user) 
            return res.status(401).json({message: "You are not authorized"});
        
        const today = new Date();
        
        const allBookings = await Booking.find({ userId: user._id, status:"active"})
        const history = allBookings.filter(b => new Date(b.date) < today);
        res.status(200).json(history);
    }catch (error) {
        res.status(500).json({message: "Theres been an error fetching your booking history", error});
    }
    
}


//-------ADMIN----------

// Hämtar alla bokingar för ADMIN 
export const getAllBookings = async (req: Request, res: Response) =>  {
    try {
        const bookings = await Booking.find().populate("userId", "name email");
        res.status(200).json(bookings);
    }catch (error) {
        res.status(500).json({message: "Theres been an error fetching all bookings", error});
    }
}