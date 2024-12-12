import express from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js"

const router = express.Router()

router.use(express.json()) // allows us to accept JSON data in the body

router.get("/", getProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router