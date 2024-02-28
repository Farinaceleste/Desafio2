const {getDatos, saveDatos} = require ("../saveAndGet.js")



class CartManager {
    constructor (ruta) {
        this.ruta = ruta 
        
    }

    getCart() {
        return getDatos(this.ruta)
    }

    newCart (product) {

        let products = this.getCart()
        console.log(products)

        let id = 1
        if (products.length>0) {
            id = Math.max(...products.map(p => p.id)) + 1
            
        }

        let nuevoCart = {
            id, ...product
        }

        products.push (nuevoCart)
        saveDatos(this.ruta, products)

        return nuevoCart
    }

    saveCart(carts) {
        saveDatos(this.ruta, carts)

    }




}

module.exports = CartManager