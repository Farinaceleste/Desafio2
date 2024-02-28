const express =require ("express")
const productRouter =require ("./routes/products.router.js")
const cartRouter =require ("./routes/cart.router.js")

const PORT = 8080;
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use ("/api/products",productRouter)
app.use("/api/cart",cartRouter)


app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text-plain")
    res.status (200).send("OK")
 })


const server = app.listen(PORT, () => {
    console.log(`Server en puerto ${PORT}`);
});