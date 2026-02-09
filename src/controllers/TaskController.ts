import { Request, Response } from 'express';
import prisma from '../lib/prisma';

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
    const {title, completed} = req.body;
    const newTask = await prisma.task.create({
      data: {title, completed}
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({error: "Error creating task"});
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {title, completed} = req.body;

    const updatedTask = await prisma.task.update({
      where: {id: Number(id)},
      data: {title, completed}
    });
    res.json(updatedTask);
  }catch (error) {
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