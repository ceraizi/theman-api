import { Router } from 'express';
import { getTasks, createTask, deleteTask, updateTask } from '../controllers/taskController';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import { validate } from '../middlewares/validate';

const router = Router();

router.get('/', getTasks);
router.post('/', validate(createTaskSchema), createTask);
router.put('/:id', validate(createTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;