import ProductRepository from "../repositories/products.repository.js";

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    getProducts = async (limit, page, sort, query) => {
        try {
            const products = await this.productRepository.getProducts(limit, page, sort, query);
            return products;
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            return null;
        }
    }

    addProduct = async (product) => {
        try {
            const newProduct = await this.productRepository.addProduct(product);
            return newProduct;
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            return null;
        }
    }

    getProductById = async (productId) => {
        try {

            const product = await this.productRepository.getProductById(productId);
            if (!product) {
                return null;
            }
            return product;
        } catch (error) {
            console.error('Error al buscar el producto por ID:', error);
            return null;
        }
    }

    updateProduct = async (id, product) => {
        try {
            const updatedProduct = await this.productRepository.updateProduct(id, product);
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            return null;
        }
    }

    deleteProduct = async (productId) => {
        try {
            const deletedProduct = await this.productRepository.deleteProduct(productId);
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return null;
        }
    }


}

export default ProductService



