import mongoose from 'mongoose'


const MONGODB_URL: string = "mongodb://127.0.0.1:27017/nodeTodo"

mongoose
    .connect(MONGODB_URL)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    })