import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import { ZodError } from 'zod';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const {completed, title} = req.query;
    const where: any = {};

    if (completed !== undefined) {
      where.completed = completed === 'true';
    }

    if (title) {
      where.title = {
        contains: String(title),
        mode: 'insensitive'
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {createdAt: 'desc'}
    });

    res.json(tasks);
  }catch (error) {
    res.status(500).json({error: "Error fetching tasks"});
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = await prisma.task.create({
      data: req.body
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const updatedTask = await prisma.task.update({
      where: {id: Number(id)},
      data: req.body
    });

    res.json(updatedTask);
  } catch (error) {
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