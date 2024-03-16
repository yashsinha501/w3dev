import express, {Request, Response} from "express";
import todoRouter from './router/todo'

const app = express();


app.use(express.json());


app.get('/', (req:Request, res:Response) => {

    res.json({
        message: "Rest API using node"
    })
})

app.use(todoRouter);

export default app;