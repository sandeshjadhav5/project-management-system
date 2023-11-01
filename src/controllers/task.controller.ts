import { PrismaClient } from "@prisma/client";
import { Context, Hono } from "hono";

const prisma = new PrismaClient();

const taskApi = new Hono();

// Create Task
taskApi.post("/tasks/create", async (c: Context) => {
  try {
    const body = await c.req.json();

    const task = await prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        projectId: body.projectId,
      },
    });

    return c.json(task);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to Create" }, 500);
  }
});

// Get All Tasks
taskApi.get("/tasks", async (c: Context) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        deletedAt: null,
      },
    });

    return c.json(tasks);
  } catch (error) {
    console.error(error);
    return c.json(error, 500);
  }
});

// Get Task by ID
taskApi.get("/tasks/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"), 10);

    const task = await prisma.task.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!task) {
      return c.json({ message: "Task not found" });
    }

    return c.json(task);
  } catch (error) {
    console.error(error);
    return c.json(error, 500);
  }
});

// Update Task
taskApi.patch("/tasks/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"), 10);
    const body = await c.req.json();

    const task = await prisma.task.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        ...body,
      },
    });

    if (!task) {
      return c.json({ message: "Task not found" }, 404);
    }

    return c.json(task);
  } catch (error) {
    console.error(error);
    return c.json({ message: error }, 500);
  }
});

// Delete Task
taskApi.delete("/tasks/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"), 10);

    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    if (!task) {
      return c.json({ message: "Task not found" }, 404);
    }

    return c.text("Task deleted", 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to Delete" }, 500);
  }
});

export { taskApi };
