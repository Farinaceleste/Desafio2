const ProductManager = require("../Managers/ProductManager.js")
const { join } = require("path")
const { saveDatos } = require("../saveAndGet.js")
const Router = require('express').Router
const router = Router()


let rutaProducts = join(__dirname, "..", "data", "products.JSON")
const productManager = new ProductManager(rutaProducts)


router.get('/', (req, res) => {
    let products = productManager.getProducts()

    let { limit, skip } = req.query

    let resultado = products
    if (skip && skip > 0) {
        resultado = resultado.slice(skip)
    }

    if (limit && limit > 0) {
        resultado = resultado.slice(0, limit)
    }

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ products })
})




router.get("/:pid", (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        if (isNaN(pid)) {
            return res.status(400).json({ error: "El id debe ser numérico" })
        }
        const product = productManager.getProductsById(pid)
        if (!product) {
            return res.status(404).json({ error: `No existe producto con id ${pid}` })
        }
        res.setHeader("Content-Type", "application/json")
        return res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/", (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.code || !req.body.stock || !req.body.status) {
            return res.status(400).json({
                error: "Complete el campo faltante"
            });
        }

        console.log(req.body)

        let nuevoProducto = {
            id: 1, 
            ...req.body
        }

        let newProduct = productManager.addProduct(nuevoProducto)

        res.setHeader("Content-Type", "application/json")
        return res.status(201).json({ newProduct })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    if (isNaN(pid)) {
      return res.status(400).json({ error: "El id debe ser numérico" })
    }
  
    let products = productManager.getProducts()
  
    let productIndex = products.findIndex(u => u.id === pid);
    if (productIndex === -1) {
      return res.status(400).json({ error: `No existen productos con id ${pid}` });
    }
  
    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      id: pid
    }
  
    productManager.saveDatos(this.ruta, products)
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ productoModificado: products[productIndex] });
  })

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: "El id debe ser numérico" })
    }
  
    const products = productManager.getProducts()
    const productIndex = products.findIndex(p => p.id === id)
  
    if (productIndex === -1) {
      return res.status(404).send(`No existen productos con id ${id}`) 
    }
  
    const productoEliminado = products[productIndex]
    products.splice(productIndex, 1)
  
    saveDatos(rutaProducts, products)

    console.log(products)
    console.log(rutaProducts)

    res.setHeader("Content-Type", "application/json")
    return res.status(200).json({ productoEliminado })

    
  })


module.exports = router