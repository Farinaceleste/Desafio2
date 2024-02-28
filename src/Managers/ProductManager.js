const { getDatos, saveDatos } = require("../saveAndGet.js")


class ProductManager {

    constructor(ruta) {
        this.ruta = ruta
        
    }

    getProducts() {
        return getDatos(this.ruta)
    }

    getProductsById(req, res, id) {
        let products = this.getProducts()
    
        let index = products.findIndex(p => p.id === id)
    
        if (index === -1) {
            res.status(404).send("No se encontró el producto con id " + id)
        } else {
            res.status(200).send(products[index])
        }
    }

    addProduct(product) {
        let products = this.getProducts();

        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map((p) => p.id)) + 1
        }

        let nuevoCart = {
            id,
            ...products,
        };

        products.push(nuevoCart)
        saveDatos(this.ruta, products)

        return nuevoCart
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
          this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
          this.saveProductsToFile();
          console.log("Producto actualizado");
        } else {
          console.log("Producto no encontrado");
        }
      }


    async deleteProduct(req, res) {
        try {
          const pid = parseInt(req.params.pid)
          await ProductManager.deleteProduct(pid)
          res.status(200).send("Producto eliminado correctamente")
        } catch (error) {
          res.status(500).send(error.message)
        }
      }

}



module.exports = ProductManager