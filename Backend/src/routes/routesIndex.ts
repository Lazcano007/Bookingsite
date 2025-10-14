import { Router } from "express";
import authRoutes from "./authRoutes";
import servicesRoutes from "./serviceRoutes";
import bookingRoutes from "./bookingRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.get('/', (req, res) => {
res.send('Hello World!');
});

router.use("/auth", authRoutes);
router.use("/services", servicesRoutes);
router.use("/bookings", bookingRoutes);
router.use("/admin", userRoutes);

export default router;