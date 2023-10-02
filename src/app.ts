import express from "express";
import { json, urlencoded } from "body-parser";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import subTaskRoutes from "./routes/subTaskRoutes";
import { authenticateUser } from "./middleware/authenticate";
import { errorLogger, loggerMiddleware } from "./middleware/errorLogger";

const app = express();

// Middleware for logging requests
app.use(loggerMiddleware);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);

// authentication middleware
app.use("/api/v1", authenticateUser);

app.use("/api/v1", projectRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", subTaskRoutes);

// Middleware for error logging
app.use(errorLogger);

export default app;
