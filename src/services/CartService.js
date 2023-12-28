import CartRepository from "../repositories/carts.repository.js";


class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    readCarts = async () => {
        try {
            const carts = await this.cartRepository.readCarts();
            return carts;
        } catch (error) {
            console.error('Error al buscar los carritos:', error);
            return null;
        }
    }

    addCart = async (cart) => {
        try {
            const newCart = await this.cartRepository.addCart(cart);
            return newCart;
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
            return null;
        }
    }

    getCartById = async (cartId) => {
        try {
            const cart = await this.cartRepository.getCartById(cartId);

            if (!cart) {
                return null;
            }
            return cart;
        } catch (error) {
            console.error('Error al buscar el carrito por ID:', error);
            return null;
        }
    }

    //Funciones para productos dentro del carrito

    addProductInCart = async (idCart, idProd) => {
        try {
            const newProduct = await this.cartRepository.addProductInCart(idCart, idProd);
            if (!newProduct) {
                return null;
            }
            return newProduct;
        } catch (error) {
            console.error('Error al guardar el producto en el carrito:', error);
            return null;
        }
    }

    existProductInCart = async (idCart, idProd) => {
        try {
            const existProductInCart = await this.cartRepository.existProductInCart(idCart, idProd);
            if (!existProductInCart) {
                return null;
            }
            return existProductInCart;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    getProductsInCart = async (idCart) => {
        try {
            const products = await this.cartRepository.getProductsInCart(idCart);
            if (!products) {
                return null;
            }
            return products;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    updateQuantityOfProduct = async (idCart, idProd, quantity) => {
        try {
            const updateQuantity = await this.cartRepository.updateQuantityOfProduct(idCart, idProd, quantity);
            if (!updateQuantity) {
                return null;
            }
            return updateQuantity;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    deleteProductInCart = async (idCart, idProd) => {
        try {
            const deleteProduct = await this.cartRepository.deleteProductInCart(idCart, idProd);
            if (!deleteProduct) {
                return null;
            }
            return deleteProduct;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    //Funciones para finalizar la compra
    purchaseCart = async (idCart) => {
        try {
            const purchase = await this.cartRepository.purchaseCart(idCart);
            if (!purchase) {
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }


}
export default CartService