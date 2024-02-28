const { getDatos, saveDatos } = require("../saveAndGet")
const ProductManager = require("./ProductManager")

class CartManager {
    constructor(ruta) {
        this.ruta = ruta

    }

    getCarts() {
        return getDatos(this.ruta)
    }

    newCart(product) {
        let carts = this.getCarts()
        let id = this.getCartId()

        let nuevoCart = {
            id: id.toString(),
            products: product || []
        };

        carts.push(nuevoCart)
        this.saveCarts(carts)

        return nuevoCart
    }

    saveCarts(carts) {
        saveDatos(this.ruta, carts)
    }

    getProducts() {
        const productManager = new ProductManager(path.join(__dirname, '..', 'data', 'products.JSON'))
        return productManager.getProducts()
    }

    getCartId() {
        const carts = this.getCarts()
        if (carts.length === 0) {
            return 1;
        } else {
            const maxId = Math.max(...carts.map(cart => parseInt(cart.id)))
            return maxId + 1
        }
    }
}


module.exports = CartManager