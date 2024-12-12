import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.MONGO_URI)

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.error(`Error: ${error.message}`)
        process.exit(1) // 1 Code meanse exit, 0 Means success 
    }
}