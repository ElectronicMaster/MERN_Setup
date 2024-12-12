import express from "express";
import mongoose from "mongoose"
import { deleteProduct, getProducts, sendProduct, updatedProduct } from "../Controller/products.controller.js";

const router = express.Router()

router.get("/", getProducts);

router.post('/', sendProduct)

router.put("/:id", updatedProduct)

router.delete("/:id", deleteProduct)


export default router;