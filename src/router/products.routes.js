import express from "express";
import { getProducts, createProduct, deleteProduct, getProductById, updateProduct } from "../controllers/products.controller.js";

const productsRouter = express.Router()


// productsRouter.get("/", getProductMaster)
productsRouter.get("/", getProducts)
productsRouter.get("/:pid", getProductById)
productsRouter.post("/", createProduct)
productsRouter.put("/:pid", updateProduct)
productsRouter.delete("/:pid", deleteProduct)


export default productsRouter;