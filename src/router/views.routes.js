import express from "express";
import authorizeRole from "../config/auth.config.js";
import { createFakeProducts } from "../config/faker.config.js";


const ViewsRouter = express.Router()

//Rutas GET para la página de inicio y detalles del producto:
// las otras vistas aca?

ViewsRouter.get("/inicio", async (req, res) => {
    res.render("inicio", {
        title: "App de compras",
    })
})
ViewsRouter.get("/register", (req, res) => {
    res.render("register", {
        title: "Registro de Usuario"
    })
})

ViewsRouter.get("/login", (req, res) => {
    res.render("login", {
        title: "Login de Usuario"
    })
})

ViewsRouter.get("/addProducts", authorizeRole("admin"), (req, res) => {
    res.render("addProducts", {
        title: "Agregar Productos"
    })
})

ViewsRouter.get("/mockingProducts", async (req, res) => {
    let products = await createFakeProducts()
    res.render("mockingProducts", {
        title: "Agregar Productos",
        products: products
    })
})




export default ViewsRouter