const { getDatos, saveDatos } = require("../saveAndGet.js")


class ProductManager {

    constructor(ruta) {
        this.ruta = ruta

    }

    getProducts() {
        return getDatos(this.ruta)

        
    }

    getProductsById(id) {
        let products = this.getProducts()

        let index = products.findIndex(p => p.id === id)

        if (index === -1) {
            return null;
        } else {
            return (products[index])
        }
    }

    addProduct(product) {
        let products = this.getProducts();

        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map((p) => p.id)) + 1
        }

        let nuevoProducto = {
            id,
            ...product
        };

        products.push(nuevoProducto)
        saveDatos(this.ruta, products)

        return nuevoProducto
    }

    updateProduct(id, updatedFields) {
        if (typeof id !== 'number') {
          return { error: "El id debe ser numérico" }
        }
      
        const productIndex = this.products.findIndex((product) => product.id === id)
        if (productIndex !== -1) {
          this.products[productIndex] = { ...this.products[productIndex], ...updatedFields }
          this.saveDatos(this.ruta, this.products)
          console.log("Producto actualizado")
        } else {
          console.log("Producto no encontrado")
        }
      }



}



module.exports = ProductManager