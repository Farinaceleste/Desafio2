const CartManager = require("../Managers/CartManager")
const { join } = require("path")
const Router = require('express').Router
const router = Router()
const getDatos = require("../saveAndGet")
const path = require('path')

let rutaCart = join(__dirname, "..", "data", "cart.JSON")
const cartManager = new CartManager(rutaCart)


router.post('/', (req, res) => {
    const carts = cartManager.getCarts()
    const newCartId = cartManager.getCartId()

    const newCart = {
        id: newCartId.toString(),
        products: req.body.products || []
    };

    carts.push(newCart)
    cartManager.saveCarts(carts)

    res.status(201).json({ newCart })
});

router.get('/:cid', (req, res) => {
    let carts = cartManager.getCarts()
    let cartId = req.params.cid.toString()
    let cart = carts.find(c => c.id === cartId)
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }
    res.json({ products: cart })
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = cartManager.getCarts()
    const cartId = req.params.cid.toString()
    const productId = parseInt(req.params.pid)
    const products = cartManager.getProducts()

    const cart = carts.find(c => c.id === cartId)
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    const productToAdd = products.find(p => p.id === productId)
    if (!productToAdd) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const existProdIndex = cart.products.findIndex(p => p.id === productId)
    if (existingProductIndex !== -1) {
        cart.products[existProdIndex].quantity++
    } else {
        cart.products.push({ id: productId, quantity: 1 })
    }

    cartManager.saveCarts(carts)
    res.json({ cart })
});

module.exports = router
