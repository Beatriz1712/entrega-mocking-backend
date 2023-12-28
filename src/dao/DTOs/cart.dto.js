export default class CartDTO {
    constructor(cart) {
        this.name = cart.name || "";
        this.description = cart.description || "";
        this.products = cart.products || [];
    }
}