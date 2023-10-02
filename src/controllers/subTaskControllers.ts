import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSubTask = async (req: Request, res: Response) => {
  try {
    const { name, description, status, createdBy } = req.body;

    const subTask = await prisma.subTask.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(subTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSubTasks = async (req: Request, res: Response) => {
  try {
    const subTask = await prisma.subTask.findMany();

    res.status(200).json(subTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSubTask = async (req: Request, res: Response) => {
  try {
    const subTaskId = parseInt(req.params.subTaskId, 10);
    const { name, description, status } = req.body;

    const updatedSubTask = await prisma.subTask.update({
      where: { id: subTaskId },
      data: { name, description },
    });

    res.status(200).json(updatedSubTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSubTask = async (req: Request, res: Response) => {
  try {
    const subTaskId = parseInt(req.params.subTaskId, 10);

    await prisma.subTask.delete({
      where: { id: subTaskId },
    });

    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
