import express from "express";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import session from "express-session";
import sessionConfig from "./config/session.config.js";
import connectMongo from "./config/mongo.config.js";
import dotenv from 'dotenv';
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import chalk from "chalk";
// Variables de entorno
dotenv.config();

//Rutas
import ViewsRouter from "./router/views.routes.js";
import productsRouter from "./router/products.routes.js";
import cartsRouter from "./router/carts.routes.js";
import UserRouter from "./router/user.routes.js";


//Creación de la aplicación Express y servidor HTTP:
const app = express()
const PORT = 8080;
// Inicia la aplicación en este index.js
//**** UP SERVER  */
app.listen(PORT, () => {
  console.log(chalk.bgYellowBright.black.bold(`SERVER UP PORT: ${PORT}`));
});


//Conexión a MongoDB:

connectMongo()

//Configuración de sesión:
app.use(session(sessionConfig))

//Configuración de passport:
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Estructura handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Configuración de rutas estáticas y de vistas:
app.use("/", express.static(__dirname + "/public"))

//Rutas para vistas:
app.use("/", ViewsRouter)

//Rutas para CRUD:
app.use("/api/users", UserRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)








