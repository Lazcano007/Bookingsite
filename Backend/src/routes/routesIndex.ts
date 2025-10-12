import { Router } from "express";
import authRoutes from "./authRoutes";
import servicesRoutes from "./serviceRoutes";

const router = Router();

router.get('/', (req, res) => {
res.send('Hello World!');
});

router.use("/auth", authRoutes);
router.use("/services", servicesRoutes);

export default router;