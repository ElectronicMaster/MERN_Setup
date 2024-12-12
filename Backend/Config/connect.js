import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async() => {
    try{
        mongoose.connect(process.env.MONGO_URI) // connecting to the database
        console.log("database connected")
    }catch(err){
        console.error("DATABASE CONNECTION ERROR :: " + err)
    }
}

connectDB()