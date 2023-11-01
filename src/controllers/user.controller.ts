import { PrismaClient } from "@prisma/client";

import { Hono, Context } from "hono";
import { sign } from "hono/jwt";

const userApi = new Hono();
const prisma = new PrismaClient();

// Create User
userApi.post("/users", async (c) => {
  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      role: body.role,
    },
  });
  return c.json(user);
});

//Get Users
userApi.get("/users", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

//Get user by ID
userApi.get("/users/:id", async (c) => {
  const id = c.req.param("id");
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return c.notFound();
  }

  return c.json(user);
});

userApi.delete("/users/:id", async (c: Context) => {
  const id = c.req.param("id");
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    return c.notFound();
  }
  return c.text("User Deleted", 200);
});

userApi.patch("/users/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      ...body,
    },
  });

  if (!user) {
    return c.notFound();
  }

  return c.json(user);
});

userApi.post("/user/login", async (c: Context) => {
  const { username, password } = await c.req.json();

  // Creating a JWT token
  const token = sign({ userId: 1 }, "semiconAssignment");

  return c.json({ token });
});

export { userApi };
