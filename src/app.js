// Importa el framework Express para crear el servidor
const express = require("express");

// Importa el router de productos y de carritos 
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto donde se ejecutará el servidor
const PORT = 8080;

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Rutas principales de la API, endpoint /api/products y /api/carts
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
