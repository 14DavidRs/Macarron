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
router.use("/tasks", authMiddleware);

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
