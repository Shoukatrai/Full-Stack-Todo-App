import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    newTask: String
})

const todoModel = mongoose.model("todo" , todoSchema)

export default todoModel;   