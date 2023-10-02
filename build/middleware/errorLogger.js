"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.loggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const customFormat = ":remote-addr :method :url :status :res[content-length] - :response-time ms";
exports.loggerMiddleware = (0, morgan_1.default)(customFormat);
const errorLogger = (error, req, res, next) => {
    console.error(`Error: ${error.message}`);
    next(error);
};
exports.errorLogger = errorLogger;
