const fs = require('fs')

class ProductManager {

    constructor(rutaArchivo) {
        this.path = rutaArchivo
    }

    crearArchivo() {
        return fs.writeFileSync(this.path, JSON.stringify([], null, 5))
    }

    archivoLeido() {
        let readFile = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf-8' }))
        return readFile
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        let products = await this.getProducts()

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Debe completar todos los campos")
            return
        }

        let existe = products.find(product => product.code === code)
        if (existe) {
            console.log('El producto ya existe')
            return
        }

        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id)) + 1
        }

        let newProduct = {
            id, title, description, price, thumbnail, code, stock
        }
        products.push(newProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))
    }


    async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    async getProductsById(id) {
        let products = await this.getProducts();
    
        let productIndex = products.findIndex(product => product.id === id);
    
        if (productIndex === -1) {
            return (`No se encontraron productos con el id ${id}`);
        }
    
        return products[productIndex];
    }


    updateProduct(id, key, valor) {
        try {
            let products = this.getProducts();
            let productIndex = products.findIndex(product => product.id === id);

            if (productIndex === -1) {
                console.log(`No se encontraron productos con el id ${id}`);
                return;
            }

            products[productIndex][key] = valor;

            fs.writeFileSync(this.path, JSON.stringify(products, null, 5));

            return products[productIndex];
        } catch (error) {
            console.error(`Ocurrió un error al actualizar el producto: ${error.message}`);
        }
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

module.exports = ProductManager

// const context = async () => {
//     const Products = new ProductManager("./products.json")

//     Products.crearArchivo()

//     await Products.addProduct("Guitarra Gibson", "Instrumento de 6 cuerdas Gibson", 1500, "./rutadeimagen1", 3, 3)
//     await Products.addProduct("Guitarra Fender", "Instrumento de 6 cuerdas Fender", 2500, "./rutadeimagen2", 4, 4)
//     await Products.addProduct("Bajo Fender", "Instrumento de 4 cuerdas Fender", 1200, "./rutadeimagen3", 5, 6)
//     await Products.addProduct("Bajo Squier", "Instrumento de 4 cuerdas Squier", 1000, "./rutadeimagen4", 6, 5)
//     await Products.addProduct("Bateria VH", "Instrumento de percusión Van Halen", 4000, "./rutadeimagen5", 7, 2)
//     await Products.addProduct("Bateria VH", 4000, "./rutadeimagen5", 7, 2)


//     console.log(await Products.getProducts())

//     console.log(await Products.getProductsById(6))
//     console.log(await Products.getProductsById(2))

//     Products.addProduct("Bajo Fender", "Instrumento de 4 cuerdas Squier", 1000, "./rutadeimagen4", 6, 5)


//     Products.deleteProduct(4)

//     Products.updateProduct(1, "description", "Guitarra de 5 cuerdas")

// }

// context()




