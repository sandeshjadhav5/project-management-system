import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
require("dotenv").config();
import { userApi } from "./controllers/user.controller";
import { projectApi } from "./controllers/project.controller";
import { taskApi } from "./controllers/task.controller";
import { subTaskApi } from "./controllers/subTask.controller";

const app = new Hono();
app.get("/", (c) => c.text("Welcome to Project Management System"));
app.route("/api", userApi);
app.use(
  "/auth/*",
  jwt({
    secret: process.env.JWT_SECRET ?? "my-secret",
  })
);
app.route("/api", projectApi);
app.route("/api", taskApi);
app.route("/api", subTaskApi);
console.log("Server Running at port 8787");

serve({
  fetch: app.fetch,
  port: 8787,
});
