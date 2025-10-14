import express  from "express";
import { services } from "../services/services";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, (req, res) => {
    res.json(services);
});

export default router;

