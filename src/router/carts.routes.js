import express from "express";
import { addProductInCart, createCart, deleteCart, deleteProductInCart, getCart, getCarts, getProductsInCart, updateCart, updateQuantityOfProduct, purchaseCart } from "../controllers/carts.controller.js";

const CartRouter = express.Router()


CartRouter.get("/", getCarts)
//Obtiene carrito con sus productos
CartRouter.get("/:cid", getCart)
CartRouter.post("/", createCart)
//Actualiza carrito
CartRouter.put("/:cid", updateCart)
//Elimina carrito
CartRouter.delete("/:cid", deleteCart)
//Productos dentro del carrito
CartRouter.get("/:cid/products/:pid", getProductsInCart)
//Agrega producto al carrito
CartRouter.post("/:cid/products/:pid", addProductInCart)
//Actualiza cantidad de productos 
CartRouter.put("/:cid/products/:pid", updateQuantityOfProduct)
//Elimina del carrito el producto seleccionado
CartRouter.delete("/:cid/products/:pid", deleteProductInCart)
//Finaliza la compra
CartRouter.post("/:cid/purchase", purchaseCart)


export default CartRouter