import express  from "express";
import { services } from "../services/services";

const router = express.Router();

router.get('/', (req, res) => {
    res.json(services);
});

export default router;

