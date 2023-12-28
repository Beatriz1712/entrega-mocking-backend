# Nombre del Proyecto

Ecommerce App

## Objetivo de esta preentrega

- Aplicar modulo de mocking de productos
- Aplicar customizador de errores
- Aplicar diccionario de errores mas comunes

## Iniciar el Proyecto

Para iniciar el proyecto, sigue los siguientes pasos:

1. Instala las dependencias:

npm install

    "@faker-js/faker": "^8.3.1",
    "bcrypt": "^5.1.1",
    "chalk": "^5.3.0",
    "commander": "^11.1.0",
    "connect-mongo": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-handlebars": "^7.1.2",
    "express-session": "^1.17.3",
    "mongodb-connection-string-url": "^3.0.0",
    "mongoose": "^6.10.0",
    "multer": "^1.4.5-lts.1",
    "passport": "^0.6.0",
    "passport-github2": "^0.1.12",
    "passport-local": "^1.0.0",
    "session-file-store": "^1.5.0",
    "socket.io": "^4.7.2",
    "uuid": "^9.0.1"
    "nodemon": "^3.0.1"

2. Inicia el servidor

npm start

## Aplicaciones agregadas

# Ruta para generar mocking

http://localhost:8080/mockingProducts

# Diccionario de Errores

Se creó archivo enums.js con los codigos comunes de errores
Se creó archivo info.js con los errores comunes en la app
Se creó archivo customError.js para crear instancias de errores nuevos
Se actualizaron los archivos users.controllers, cart.controllers y products.controllers para manejar los errores con la nueva instancia

# Modificacion de la paginacion actual
*Se creo DTOs
*Se eliminaron las funciones, getProductByLimit, getProductByQuery, getProductByPage y getProductMaster por una unica funcion getProduct(limit, page, sort, query) en todos los archivos de products desde model hasta router.

## Rutas para interactuar con postman

# Agregar Producto

Ruta POST
http://localhost:8080/api/products

Cuerpo de la solicitud

{
"title": "nombre del producto",
"description": "descripcion del producto",
"price": 2000,
"stock": 20,
"category": "categoria",
"thumbnail": "url de la imagen en png"
}

# Agregar Carrito

Ruta POST
http://localhost:8080/api/carts

Cuerpo de la solicitud

{
"name": "nombre carrito",
"description": "descripcion carrito",
"products": []
}

# Agregar Producto a un Carrito

Ruta POST
http://localhost:8080/api/carts/<cid>/products/<pid>

Cuerpo de la solicitud
{
"id": "<pid>",
"cantidad": 1
}

# Ruta para Agregar Ticket

POST
http://localhost:8080/api/carts/<cid>/purchase

## Usuarios de Prueba

Usuario Admin
Email: p@gmail.com
Contraseña: 1

Usuario Regular
Email: puser@gmail.com
Contraseña: 1

