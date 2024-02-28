const  CartManager  = require ("../Managers/CartManager.js")
const { join } = require ("path")
const Router = require('express').Router;
const router = Router()
const getDatos = require ("../saveAndGet.js")

let rutaCart = join (__dirname, "data", "cart.json")
const cartManager = new CartManager(rutaCart)


router.get("/", (req, res) => {

    getDatos()
    let carrito = cartManager.getCart()

    res.setHeader ("Content-Type", "application-JSON")
    res.status (200).json ({carrito})



})

router.post ("/:id", (req, res) => {

    let {id} = req.body
    if (!id) {
        res.setHeader ("Content-Type", "application-JSON")
        res.status (400).json ({error: "Complete el id"})
    }

    let nuevoCart = cartManager.createCart(req.body)

    res.setHeader ("Content-Type", "application-JSON")
    res.status (201).json ({nuevoCart})


}) 
 

module.exports=router
