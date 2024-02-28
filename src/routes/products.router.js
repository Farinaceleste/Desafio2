const  ProductManager  =require ("../Managers/ProductManager.js")
const {join} = require("path")
const Router=require('express').Router;
const router=Router()


let rutaProducts=join(__dirname, "..", "data", "products.JSON")
const productManager=new ProductManager(rutaProducts)


router.get('/api/products',  (req, res) => {
   let products = productManager.getProducts()

   res.setHeader( 'Content-Type','application/json')
   res.status(200).json({products})
});

router.get("/api/products/:pid", (req, res) => {
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

router.post("/api/products/", (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status } = req.body
        if (!title || !description || !price || !thumbnail || !code || !stock || !status) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }
        const product = productManager.addProduct(req.body)
        res.setHeader("Content-Type", "application/json")
        return res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/api/products/:pid", (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        if (isNaN(pid)) {
            return res.status(400).json({ error: "El id debe ser numérico" })
        }
        const { title, description, price, code, stock, status } = req.body
        if (!title || !description || !price || !code || !stock || !status) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }
        const product = productManager.updateProduct(pid, req.body)
        if (!product) {
            return res.status(404).json({ error: `No existe producto con id ${pid}` })
        }
        res.setHeader("Content-Type", "application/json")
        return res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/api/products/:pid", (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        if (isNaN(pid)) {
            return res.status(400).json({ error: "El id debe ser numérico" })
        }
        const product = productManager.deleteProduct(pid)
        if (!product) {
            return res.status(404).json({ error: `No existe producto con id ${pid}` })
        }
        res.setHeader("Content-Type", "application/json")
        return res .status(200).json({ message: "Se eliminó correctamente el producto."})

    }
    catch(error){
        console.log('Error al borrar el producto', error);
    }
});



module.exports=router