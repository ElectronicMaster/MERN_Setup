import Product from "../Models/product.model.js"
import mongoose from "mongoose";

// GET
export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(`ERROR::Products not found::${error}`);
        response.status(404).json({ success: false, message: "Could not fetch products" });
    }
}

// PUT
export const updatedProduct = async (request,response) => {
    const {id} = request.params;
    const product = request.body;

    // Checking wether the ID is correct or not
    if(!mongoose.Types.ObjectId.isValid(id)){ 
        return response.status(500).json({success:false,message:"ERROR::invalid ID"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        response.status(200).json({success:true,updated:updatedProduct})
    }catch(error){
        response.status(500).json({success:false,message:"ERROR could not update"})
        console.log(`ERROR::UPDATE::${error}`)
    }
}

// POST
export const sendProduct = async (request, response) => {
    const product = request.body; // user will send this data
    if(!product.name || !product.price || !product.image){
        return response.status(400).json({success:false,message:"Please provide all the fields"})
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        response.status(201).json({success: true, data: newProduct})
    }catch(error){
        console.error(`ERROR:: create product :: ${error.message}`)
        response.status(500).json({success: false, message: "Server Error"})
    }
}

// DELETE
export const deleteProduct = async (request,response) => {
    const {id} = request.params
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(500).json({success:false,message:"ERROR::invalid ID"})
    }

    try{
        await Product.findByIdAndDelete(id);
        response.status(200).json({success:true,message:"product deleted"})
    }catch(error){
        console.error(`ERROR::Could not delete::${error}`)
        response.status(500).json({success:false,message:"Server ERROR"})
    }
}