import TodoModel from '../models/todo';
import todo, {Todo} from '../models/todo';
import { Request, Response } from 'express';

export const createTodo = async(req: Request, res:Response)=>{
    const todoData = new todo<Todo>(req.body);
    
    try {
        await todoData.save();
    } catch (error) {
        return res.status(500).json({
            error
        })
    }

    res.status(201).json({
        message: "Todo Created Successfully"
    })
}

export const getTodos = async(req:Request, res:Response) => {
    const todoData = await todo.find<Todo>();

    res.json({
        todoData,
    });
};

export const getTodoById = async(req:Request, res:Response) => {
    const todoData = req.params._id;

    try {
        const todo = await TodoModel.findById(todoData);

        if(!todo){
            return res.status(404).json({
                message: "This todo does not exist"
            });
        }

        return res.json({
            todo,
        })
    } catch (error) {        
        return res.status(500).json({
            error,
        })
    }
}

export const deleteTodoById = async(req:Request, res:Response) => {
    const todoId = req.params._id;

    try {
        const todo = await TodoModel.findByIdAndDelete(todoId);

        if(!todo){
            return res.status(404).json({
                message: 'This Todo does not exist'
            })
        }
        
        return res.json({
            message: 'This was deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};

export const updateTodoById = async(req:Request, res:Response) => {
    const todoId = req.params._id;
    const todoData = req.body;

    try {
        const todo = await TodoModel.findByIdAndUpdate(todoId,todoData, {new:true});

        if(!todo){
            return res.status(404).json({
                message: 'This Todo does not exist'
            })
        }
        
        return res.json({
            message: 'This was deleted successfully',
            todo: todo
        })
    } catch (error) {
        return res.status(500).json({
            error,
        });
    }
};