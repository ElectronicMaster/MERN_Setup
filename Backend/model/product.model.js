import mongoose from "mongoose";

const productSchema = new mongoose.Schema({ // Creating basic structure of the collection product
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)    // create collection "products"

export default Product