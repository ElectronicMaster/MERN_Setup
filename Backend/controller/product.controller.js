import { response } from "express"
import Product from "../model/product.model.js"
import mongoose from "mongoose"

export const getProduct = async(request,response) => {
    try{
        response.status(200).send(await Product.find())
    }catch(err){
        console.error("ERROR FETCHING PRODUCT" + err)
        response.status(500).send({ // Server is unable to fullfill request
            status: false,
            message: "Cannot fetch product!!"
        })
    }
}

export const createProduct = async(request,response) => {
    const product = request.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return response.status(400).json({ // 400 :: client error 
            success: false,
            message: "Please provide all field"
        })
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        response.status(201).json({ // 201 :: creation of resource success
            success: true,
            data: newProduct
        })
    }catch(err){
        console.error("ERROR CREATING PRODUCT" + err)
        response.status(500).json({ // 500 :: server is unable to fulfill a request
            success: false,
            message: "Server Error"
        })
    }
}

export const updateProduct = async(request,response) => {
    const {id} = request.params
    const product = request.body

    if(!mongoose.Types.ObjectId.isValid(id)){ // Check if it is right ID
        return response.status(404).send({
            status: false,
            message: "Invalid Product ID"
        })
    }

    try{
        // By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        response.status(200).send({
            status: true,
            message: "Product updated",
            product: updatedProduct
        })
    }catch(err){
        request.status(404).send({
            status: false,
            message: "Could not complete update"
        })
    }
}

export const deleteProduct = async(request,response) =>{
    const {id} = request.params // /:id => params => {id: <id>}
    console.log(mongoose.Types.ObjectId.isValid(id))

    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).send({
            status: false,
            message: "Invalid Product ID"
        })
    }

    try{
        await Product.findByIdAndDelete(id);
        response.status(200).json({status: true, message: "Product Deleted"})
    }catch(err){
        response.status(404).json({status: false, message: "Product not found"})
    }
}