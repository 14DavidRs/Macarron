import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/register", registerUser);

export default router;
