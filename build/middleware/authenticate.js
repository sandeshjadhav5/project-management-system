"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    try {
        // Verify the JWT token
        const decoded = jsonwebtoken_1.default.verify(token, "randomKey");
        // Attach the user ID to the request for further use
        if (decoded && decoded.userId) {
            req.body.userId = decoded.userId;
            next();
        }
        else {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authenticateUser = authenticateUser;
