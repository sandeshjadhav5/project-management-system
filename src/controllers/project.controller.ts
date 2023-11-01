import { PrismaClient } from "@prisma/client";
import { Hono, Context } from "hono";

const projectApi = new Hono();
const prisma = new PrismaClient();

// Create Project
projectApi.post("/projects/create", async (c) => {
  const body = await c.req.json();
  const project = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description,
      status: body.status,
      createdById: body.createdById,
    },
  });
  return c.json(project);
});

// Get All Projects
projectApi.get("/projects", async (c) => {
  try {
    const projects = await prisma.project.findMany();
    return c.json(projects);
  } catch (error) {
    console.error(error);
    return c.text("Error", 500);
  }
});

// Get Project by ID
projectApi.get("/projects/:id", async (c) => {
  const id = c.req.param("id");
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      tasks: true,
    },
  });

  if (!project) {
    return c.notFound();
  }

  return c.json(project);
});

// Update Project
projectApi.patch("/projects/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const project = await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      ...body,
    },
  });

  if (!project) {
    return c.notFound();
  }

  return c.json(project);
});

// Delete Project
projectApi.delete("/projects/:id", async (c: Context) => {
  const id = c.req.param("id");
  const project = await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    return c.notFound();
  }

  return c.text("Project Deleted", 200);
});

export { projectApi };
