"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubTask = exports.updateSubTask = exports.getSubTasks = exports.createSubTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSubTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status, createdBy } = req.body;
        const subTask = yield prisma.subTask.create({
            data: {
                name,
                description,
            },
        });
        res.status(201).json(subTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createSubTask = createSubTask;
const getSubTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subTask = yield prisma.subTask.findMany();
        res.status(200).json(subTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSubTasks = getSubTasks;
const updateSubTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subTaskId = parseInt(req.params.subTaskId, 10);
        const { name, description, status } = req.body;
        const updatedSubTask = yield prisma.subTask.update({
            where: { id: subTaskId },
            data: { name, description },
        });
        res.status(200).json(updatedSubTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateSubTask = updateSubTask;
const deleteSubTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subTaskId = parseInt(req.params.subTaskId, 10);
        yield prisma.subTask.delete({
            where: { id: subTaskId },
        });
        res.status(204).send(); // No content response for successful deletion
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteSubTask = deleteSubTask;
