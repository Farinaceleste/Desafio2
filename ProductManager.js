const fs = require('fs')

class ProductManager {

    constructor() {
        this.path = "./archivos/products.JSON"
    }

    crearArchivo() {
        fs.writeFileSync(this.path, JSON.stringify([], null, 5))
    }

    archivoLeido() {
        let readFile = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf-8' }))
        return readFile
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Debe completar todos los campos")
            return
        }

        let products = this.archivoLeido()

        let existe = products.find(producto => producto.code === code)
        if (existe) {
            console.log('El producto ya existe')
            return
        }

        let id = 1
        if (products.length > 0) {
            id = products[products.length - 1].id + 1;
        }

        let newProduct = {
            id, title, description, price, thumbnail, code, stock
        }
        products.push(newProduct)

        fs.writeFileSync(this.path, JSON.stringify(products, null, 5))
    }


    getProducts() {
        return this.archivoLeido()

    }

    getProductsById(id) {

        let productsID = this.archivoLeido()

        let indiceProd = productsID.findIndex(producto => producto.id === id)
        if (indiceProd === -1) {
            return (`No se encontraron productos con el id ${id}`)

            
        }
        return productsID[indiceProd]
    }


    updateProduct(id, key, valor) {
        let products = this.getProducts();
        let productIndex = products.findIndex(product => product.id === id);
    
        if (productIndex === -1) {
            console.log(`No se encontraron productos con el id ${id}`)
            return
        }
    
        products[productIndex][key] = valor;
    
        fs.writeFileSync(this.path, JSON.stringify(products, null, 5))
    }


    deleteProduct(id) {

        let archivoLeido = this.archivoLeido()
        let archivoAEliminar = archivoLeido.findIndex(producto => producto.id === id)

        if (archivoAEliminar === -1) {
            console.log(`No es posible eliminar el producto con id ${id}, por no existir en la base de datos.`)

        }

            archivoLeido.splice(archivoAEliminar, 1)

            fs.writeFileSync(this.path, JSON.stringify(archivoLeido, null, 5))
            console.log(`Se eliminó el producto con el id: ${id}`)
     

    }

}

const Products = new ProductManager()

Products.crearArchivo()

Products.addProduct("Guitarra Gibson", "Instrumento de 6 cuerdas Gibson", 1500, "./rutadeimagen1", 3, 3)
Products.addProduct("Guitarra Fender", "Instrumento de 6 cuerdas Fender", 2500, "./rutadeimagen2", 4, 4)
Products.addProduct("Bajo Fender", "Instrumento de 4 cuerdas Fender", 1200, "./rutadeimagen3", 5, 6)
Products.addProduct("Bajo Squier", "Instrumento de 4 cuerdas Squier", 1000, "./rutadeimagen4", 6, 5)
Products.addProduct("Bateria VH", "Instrumento de percusión Van Halen", 4000, "./rutadeimagen5", 7, 2)
Products.addProduct("Bateria VH", 4000, "./rutadeimagen5", 7, 2)


console.log(Products.getProducts())

console.log(Products.getProductsById(6))
console.log(Products.getProductsById(2))

Products.addProduct("Bajo Fender", "Instrumento de 4 cuerdas Squier", 1000, "./rutadeimagen4", 6, 5)


Products.deleteProduct(4)

Products.updateProduct(1, "description", "Guitarra de 5 cuerdas")



