"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const subTaskRoutes_1 = __importDefault(require("./routes/subTaskRoutes"));
const authenticate_1 = require("./middleware/authenticate");
const errorLogger_1 = require("./middleware/errorLogger");
const app = (0, express_1.default)();
// Middleware for logging requests
app.use(errorLogger_1.loggerMiddleware);
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/api/v1", userRoutes_1.default);
// authentication middleware
app.use("/api/v1", authenticate_1.authenticateUser);
app.use("/api/v1", projectRoutes_1.default);
app.use("/api/v1", taskRoutes_1.default);
app.use("/api/v1", subTaskRoutes_1.default);
// Middleware for error logging
app.use(errorLogger_1.errorLogger);
exports.default = app;
