import express, { response } from "express"
import productRoutes from "./routes/product.route.js"
import cors from "cors"
import path from "path"

import dotenv from "dotenv"
dotenv.config()

import { connectDB } from "./Config/connect.js"

const app = express()
const __dirname = path.resolve()

app.use(cors())
app.use(express.json())
app.use("/product", productRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/my-app/build")))
    app.get("*", (request,response) => {
        response.sendFile(path.resolve(__dirname,"my-app", "build", "index.html"))
    })

    console.log(path.resolve(__dirname,"my-app", "build", "index.html"))
}

console.log(process.env.PORT)

app.listen(process.env.PORT, () => {
    connectDB() // Starting database from server
    console.log("server started")
})