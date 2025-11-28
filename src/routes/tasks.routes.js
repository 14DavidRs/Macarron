import { Router } from "express";
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from "../controllers/tasks.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Todas las rutas de /tasks deben estar protegidas
const passportAuth = passport.authenticate("jwt", { session: false });

router.get("/tasks", passportAuth, getTasks);
router.post("/tasks", passportAuth, createTask);
router.put("/tasks/:id", passportAuth, updateTask);
router.delete("/tasks/:id", passportAuth, deleteTask);

export default router;
