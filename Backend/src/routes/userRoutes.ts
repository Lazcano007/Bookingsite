import { Router } from "express";
import { getUserById, getAllUser, getAllBookings, createUserByAdmin, deleteUser, updateUser } from "../controllers/authController";
import { protect, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profiles", protect, isAdmin, getAllUser);
router.get("/profiles/:id", protect, isAdmin, getUserById);
router.put("/profiles/:id", protect, isAdmin, updateUser);
router.delete("/profiles/:id", protect, isAdmin, deleteUser);
router.post("/profiles", protect, isAdmin, createUserByAdmin);
router.get("/bookings", protect, isAdmin, getAllBookings);

export default router;
