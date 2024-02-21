const express = require("express");
const ProductManager = require("./ProductManager");

const PORT = 3000;
const app = express();

const Products = new ProductManager("./products.JSON");

app.get("/products", async (req, res) => {
    let products
    try {
        products = await Products.getProducts()
    } catch (error) {
        console.log(error.message)
    }

    res.json(products);


    // let { limit, skip } = req.query

    // let resultado = products

    // if (limit && !isNaN  (limit) > 0) {
    //     resultado = resultado.slice(0, limit)
       
    // }

    // if (skip && !isNaN (skip) > 0) {
    //     resultado = resultado.slice(0, skip)
    // }

    //  res.json(resultado)

});



app.get("/products/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);

    if (isNaN(id)) {
        return res.send("El id tiene que ser de tipo numérico");
    }

    let productId;
    try {
        productId = await Products.getProductsById(id);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Error al buscar el producto" });
    }

    if (!productId) {
        return res.status(404).json({ error: `No existen productos con el id: ${id}` });
    }

    res.json(productId);

    
});

app.get("*", (req, res) => {
    res.send ("Error 404 - NOT FOUND")
 })





app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`);
});