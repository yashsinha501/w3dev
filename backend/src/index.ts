import app from "./app";
import "./db/mongoDB"

const PORT = parseInt(process.env.PORT!) || 8080


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
})