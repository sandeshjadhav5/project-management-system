import { Router } from "express";
import {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectWithTasks,
} from "../controllers/projectControllers";

const router = Router();

router.post("/projects", createProject);
router.get("/projects/:id", getProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.get("/projectswithtasks/:id", getProjectWithTasks);

export default router;
