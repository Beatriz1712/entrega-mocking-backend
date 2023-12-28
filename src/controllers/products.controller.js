import ProductService from '../services/ProductService.js';
import ProductDTO from '../dao/DTOs/product.dto.js';
import UserDTO from '../dao/DTOs/user.dto.js';
const productService = new ProductService();


export async function getProducts(req, res) {
    try {
        if (!req.session.email) {
            return res.redirect("/login")

        }
        let limit = parseInt(req.query.limit) || 10;
        let page = parseInt(req.query.page) || 1;
        let sort = req.query.sort || "asc";
        let query = req.query.query || {};
        let allProducts = await productService.getProducts(limit, page, sort, query);

        if (!allProducts) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCTS_NOT_FOUND",
                    message: "No se encontraron productos"
                })
            )
        }

        allProducts = allProducts.docs.map(product => new ProductDTO(product))
        console.log("El usuario es:", req.session.user)
        let { first_name, email, role } = req.session.user
        const userData = new UserDTO({ first_name, email, role })
        console.log("El userData es:", userData)

        res.render("home", {
            title: "Segunda Pre Entrega",
            products: allProducts,
            user: userData

        })
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export async function getProductById(req, res) {
    try {
        const prodId = req.params.pid;

        const prod = await productService.getProductById(prodId);

        if (!prod) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_FOUND",
                    message: "No se encontró el producto"
                })
            )
        }
        const productDetail = prod.toObject();
        res.render("prod", {
            title: "Detalle de Producto",
            product: productDetail
        })
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
}

export async function createProduct(req, res) {
    try {
        let { title, description, price, category, stock, thumbnail } = req.body;
        console.log("El body es:", req.body)

        if (!title || !description || !price || !category || !stock || !thumbnail) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_CREATED",
                    message: "El producto no se ha podido crear"
                })
            )
        }
        let result = await productService.addProduct({
            title,
            description,
            price,
            category,
            stock,
            thumbnail
        })
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

export async function updateProduct(req, res) {
    try {
        let { pid } = req.params;

        //esta bien llamado? esta diferente del de createProduct
        let productToReplace = req.body;
        if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.category || !productToReplace.stock || !productToReplace.thumbnail) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_UPDATED",
                    message: "El producto no se ha podido actualizar"
                })
            )
        }
        let result = await productService.updateProduct(pid, productToReplace);
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}

export async function deleteProduct(req, res) {
    try {
        let { pid } = req.params;
        let result = await productService.deleteProduct(pid);
        if (!result) {
            return next(
                CustomError.createError({
                    statusCode: 404,
                    causeKey: "PRODUCT_NOT_DELETED",
                    message: "El producto no se ha podido eliminar"
                })
            )
        }
        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}



