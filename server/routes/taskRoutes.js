import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/', authMiddleware, createTask);
taskRouter.get('/', authMiddleware, getTasks);
taskRouter.put('/:id', authMiddleware, updateTask);
taskRouter.delete('/:id', authMiddleware, deleteTask);

export default taskRouter;
