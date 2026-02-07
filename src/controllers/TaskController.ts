import { Request, Response } from 'express';
import { Task } from '../models/Task';

let tasks: Task[] = [
  { id: 1, title: "task1", completed: false },
  { id: 2, title: "task2", completed: true }
];

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const newTask: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};