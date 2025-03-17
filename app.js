import express from "express"
import mongoose from "mongoose"
import todoModel from "./models/todoSchema.js";
import cors from "cors"

const app = express()
app.use(cors())

const PORT = 3030

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const URI = `mongodb+srv://admin:admin123@class08.7oayb.mongodb.net/?retryWrites=true&w=majority&appName=class08`

mongoose.connect(URI)
    .then(() => console.log("MonogDb Connected"))
    .catch((err) => console.log("MonogDb Error ", err))
// app.get("/" , (req , res)=>{
//     console.log(req.url)
//     res.json({
//         message: "Hello Server"
//     })
// })

app.post("/todocreate", async (req, res) => {
    console.log(req.url)
    console.log(req.body)
    try {
        const data = await todoModel.create(req.body)
        res.json({
            message: "todocreate",
            data: data
        })


    } catch (error) {
        console.log("error", error)
        res.json({
            message: "error",
            error: error
        })
    }

})


app.get("/todoget", async (req, res) => {
    console.log(req.url)
    try {
        const response = await todoModel.find()
        res.json({
            message: "todo get",
            response
        })
    } catch (error) {
        res.json({
            message: "error",
            error
        })
    }
})

app.put("/todoupdate/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const updateTodoRes = await todoModel.findByIdAndUpdate(id , req.body , {new: true})
            res.json({
                message: "todo Updated",
                updateTodoRes
            })
    } catch (error) {
        res.json({
            message: "error",
            error
        })
    }
})

app.delete("/tododelete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const deletTodoRes = await todoModel.findByIdAndDelete(id)
            res.json({
                message: "todo Updated",
                deletTodoRes
            })
    } catch (error) {
        res.json({
            message: "error",
            error
        })
    }
})




app.listen(PORT, () => console.log("Server is running on ", PORT))