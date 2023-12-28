import CartService from '../services/CartService.js';
const cartService = new CartService();

export async function getCarts(req, res) {
    try {
        let carts = await cartService.readCarts();

        if (!carts) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "CART_NOT_FOUND",
                    message: "No se encontraron carritos"
                })
            )
        }

        res.send({ result: "success", payload: carts })
    }
    catch (error) {
        console.log("Cannot get carts with mongoose: ", error);
    }
}

//Obtiene carrito con sus productos
export async function getCart(req, res) {
    const cartId = req.params.cid;

    try {
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "CART_NOT_FOUND",
                    message: "No se encontró el carrito"
                })
            )
        }
        res.json(cart);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
}

export async function createCart(req, res) {
    let { name, description, products } = req.body;

    if (!name || !description || !products) {
        if (!carts) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: CART_NOT_CREATED,
                    message: "El carrito no se ha podido crear"
                })
            )
        }
    }
    let result = await cartService.addCart({
        name,
        description,
        products
    })
    res.send({ result: "success", payload: result })
}

//Actualiza carrito

export async function updateCart(req, res) {
    let { cid } = req.params;
    let cartToReplace = req.body;
    if (!cartToReplace.name || !cartToReplace.description || !cartToReplace.products) {
        if (!carts) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: CART_NOT_UPDATED,
                    message: "El carrito no se ha podido actualizar"
                })
            )
        }
    }
    let result = await cartService.updateCart(cid, cartToReplace);
    res.send({ result: "success", payload: result })
}

//Elimina carrito
export async function deleteCart(req, res) {
    let { cid } = req.params;
    try {
        let result = await cartService.deleteCart(cid);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: CART_NOT_DELETED,
                    message: "El carrito no se ha podido eliminar"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito' });
    }
}

//Productos dentro del carrito
export async function getProductsInCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const result = await cartService.existProductInCart(cartId, productId);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_FOUND_IN_CART",
                    message: "No se encontró el producto en el carrito"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

//Agrega producto al carrito
export async function addProductInCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const result = await cartService.addProductInCart(cartId, productId);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_CREATED_IN_CART",
                    message: "No se pudo agregar el producto al carrito"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
}

//Actualiza cantidad de productos 
export async function updateQuantityOfProduct(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    try {
        const result = await cartService.updateQuantityOfProduct(cartId, productId, newQuantity);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_UPDATED_IN_CART",
                    message: "No se pudo actualizar el producto en el carrito"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}

//Elimina del carrito el producto seleccionado
export async function deleteProductInCart(req, res) {
    let cartId = req.params.cid;
    let productId = req.params.pid;

    try {
        const result = await cartService.deleteProductInCart(cartId, productId);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_DELETED_IN_CART",
                    message: "No se pudo eliminar el producto del carrito"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }

}

//Finaliza la compra

export async function purchaseCart(req, res) {
    let cartId = req.params.cid;
    try {
        const result = await cartService.purchaseCart(cartId);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PURCHASE_ERROR",
                    message: "Error en la compra"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ error: 'Error al realizar la compra' });
    }
}