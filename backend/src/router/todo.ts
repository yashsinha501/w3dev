import express from 'express'
import {createTodo, deleteTodoById, getTodoById, getTodos,updateTodoById} from '../controllers/todoControllers'

const router = express.Router();

router.post('/todos', createTodo);

router.get('/todos',getTodos);

router.get('/todos/:_id',getTodoById)

router.delete('/todos/:_id',deleteTodoById);

router.put('/todos/:_id',updateTodoById);

export default router;