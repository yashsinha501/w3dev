import mongoose from 'mongoose';

export interface Todo{
    title: String;
    desc: String;
}

const todoSchema = new mongoose.Schema<Todo>({
    title: {type: String, required: true},
    desc: {type: String, required: true},
},
{timestamps: true}
)

const Todo = mongoose.model<Todo>("Todo",todoSchema);

export default Todo;