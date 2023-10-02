import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers";

const router = Router();

router.post("/projects/:projectId/tasks", createTask);
router.get("/tasks/:id", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
