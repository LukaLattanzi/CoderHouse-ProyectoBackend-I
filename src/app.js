// Importa el framework Express para crear el servidor
const express = require("express");

// Importa el router de productos
const productsRouter = require("./routes/products.router");

// Importa el router de carritos
const cartsRouter = require("./routes/carts.router");

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto donde se ejecutará el servidor
const PORT = 8080;

// Middlewares para procesar JSON y datos de formularios
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios (URL-encoded)

// Rutas principales de la API
app.use("/api/products", productsRouter); // Asocia las rutas de productos al endpoint /api/products
app.use("/api/carts", cartsRouter); // Asocia las rutas de carritos al endpoint /api/carts

// Inicia el servidor y muestra un mensaje en consola cuando está listo
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
