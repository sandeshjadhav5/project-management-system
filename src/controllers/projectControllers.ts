import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;
    const userId = req.body.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        status,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProject = async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id, 10);
  
      
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
          tasks: true, 
        },
      });
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: req.body,
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    await prisma.project.delete({ where: { id: projectId } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProjectWithTasks = async (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id, 10);

    const projectWithTasks = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: true,
      },
    });

    if (!projectWithTasks) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(projectWithTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
