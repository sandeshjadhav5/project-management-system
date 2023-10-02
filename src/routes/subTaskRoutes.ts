import { Router } from "express";
import {
  createSubTask,
  getSubTasks,
  updateSubTask,
  deleteSubTask,
} from "../controllers/subTaskControllers";

const router = Router();

router.post("/subtasks", createSubTask);
router.get("/subtasks/:id", getSubTasks);
router.put("/subtasks/:id", updateSubTask);
router.delete("/subtasks/:id", deleteSubTask);

export default router;
