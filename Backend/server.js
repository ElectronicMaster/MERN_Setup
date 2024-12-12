import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./Config/db.js"

import productRoutes from './routes/product.js'

dotenv.config()
const app = express()

app.get('/',(require,response) => {
    response.send("Hello Page")
})

app.use(express.json()); // allows us to access JSON data in the req.body
app.use("/api/products",productRoutes);


app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log("Server is LIVE::PORT:"+process.env.PORT)
})


// mongodb://localhost:27017/