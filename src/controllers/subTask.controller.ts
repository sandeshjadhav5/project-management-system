import { PrismaClient } from "@prisma/client";
import { Context, Hono } from "hono";

const prisma = new PrismaClient();

const subTaskApi = new Hono();

// Create Task
subTaskApi.post("/subtasks/create", async (c: Context) => {
  try {
    const body = await c.req.json();

    const subTask = await prisma.subTask.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
      },
    });

    return c.json(subTask);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to Create" }, 500);
  }
});

// Get All subtasks
subTaskApi.get("/subtasks", async (c: Context) => {
  try {
    const subtasks = await prisma.task.findMany({
      where: {
        deletedAt: null,
      },
    });

    return c.json(subtasks);
  } catch (error) {
    console.error(error);
    return c.json(error, 500);
  }
});

// Get Task by ID
subTaskApi.get("/subtasks/:id", async (c: Context) => {
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
subTaskApi.patch("/subtasks/:id", async (c: Context) => {
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
subTaskApi.delete("/subtasks/:id", async (c: Context) => {
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

export { subTaskApi };
