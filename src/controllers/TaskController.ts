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

export const deleteTask = (req: Request, res: Response) => {
  const {id} = req.params;
  
  const originalLength = tasks.length;
  tasks = tasks.filter(t => t.id !== parseInt(id));

  if (tasks.length === originalLength) {
    return res.status(404).json({message: "Task not found"});
  }

  res.json({message: "Task deleted successfully"});
};

export const updateTask = (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, completed} = req.body;

  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title !== undefined){
    tasks[taskIndex].title = title;
  }
  
  if (completed !== undefined){
    tasks[taskIndex].completed = completed;
  }

  res.json(tasks[taskIndex]);
};