import { Router } from "express";
import { getAllUser, deleteUser, updateUser } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";
import { registerUser } from "../controllers/authController";



const router = Router();

router.get("/profiles", protect, getAllUser);
router.post("/profiles/", protect, registerUser);
router.put("/profiles/:id", protect, updateUser);
router.delete("/profiles/:id", protect, deleteUser);


export default router;


