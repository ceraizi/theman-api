import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import { Prisma } from '@prisma/client';

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const {completed} = req.query;
  const where: Prisma.TaskWhereInput = {};

  if (completed !== undefined) {
    where.completed = completed === 'true';
  }

  const tasks = await prisma.task.findMany({ where });
  res.json(tasks);
});

export const createTask = catchAsync (async (req: Request, res: Response) => {
  const newTask = await prisma.task.create({
    data: req.body
  });

  res.status(201).json(newTask);
});

export const updateTask = catchAsync (async (req: Request, res: Response) => {
  const {id} = req.params;

  const task = await prisma.task.findUnique({where: {id: Number(id)}});

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const updatedTask = await prisma.task.update({
    where: {id: Number(id)},
    data: req.body
  });

  res.json(updatedTask);
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;

  const task = await prisma.task.findUnique({where: {id: Number(id)}});

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await prisma.task.delete({where: {id: Number(id)}});
  res.json({message: "Task Deleted"});
});