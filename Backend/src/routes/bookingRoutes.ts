import express from "express";
import { createBooking, getUserBookings, getAllBookings, getBookedTimes, cancelBooking, getUpcomingBooking, getBookingHistory } from "../controllers/bookingController";
import { isAdmin, protect } from "../middlewares/authMiddleware";


const router = express.Router();

router.post("/", protect, createBooking);
router.get("/upcoming", protect, getUpcomingBooking);  // Visar kommande bokningar
router.get("/history", protect, getBookingHistory);  // Visar historiken
router.get("/booked-times/:date", protect, getBookedTimes); // Hämatr bokade tider.
router.delete("/:id", protect, cancelBooking);




router.get("/all", protect, isAdmin, getAllBookings); // ADMIN


export default router;