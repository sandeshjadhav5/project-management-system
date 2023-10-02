import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
  getUserProjects,
  getUserTasks,
  getUserSubTasks,
} from "../controllers/userControllers";

const router = Router();

router.post("/users/login", login);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users/projects", getUserProjects);
router.get("/users/tasks", getUserTasks);
router.get("/users/subtasks", getUserSubTasks);

export default router;
