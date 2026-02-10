import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import { ZodError } from 'zod';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {createdAt: 'desc'}
    });

    res.json(tasks);
  }catch (error) {
    res.status(500).json({error: "Error fetching tasks"});
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);

    const newTask = await prisma.task.create({
      data: validatedData
    });

    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const validatedData = updateTaskSchema.parse(req.body);

    const updatedTask = await prisma.task.update({
      where: {id: Number(id)},
      data: validatedData
    });

    res.json(updatedTask);
  }catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }

    res.status(404).json({error: "Task not found"});
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await prisma.task.delete({
      where: {id: Number(id)}
    });
    res.json({message: "Task deleted"});
  } catch (error) {
    res.status(404).json({error: "Task not found"});
  }
};