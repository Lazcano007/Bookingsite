import { Router } from "express";
import { getAllUser, deleteUser, updateUser } from "../controllers/authController";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import { registerUser } from "../controllers/authController";



const router = Router();

router.get("/profiles", protect, isAdmin, getAllUser);
router.post("/profiles/", protect, isAdmin, registerUser);
router.put("/profiles/:id", protect, isAdmin, updateUser);
router.delete("/profiles/:id", protect, isAdmin, deleteUser);


export default router;
