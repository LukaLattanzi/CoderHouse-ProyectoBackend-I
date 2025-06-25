// Importa el framework Express para crear el servidor
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

// Importa el router de productos y de carritos
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

// Importa el ProductManager para manejar los productos
const ProductManager = require("./managers/ProductManager");
const productManager = new ProductManager("./src/data/products.json");

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto donde se ejecutará el servidor
const PORT = 8080;

// Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Middleware de logging simple
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     console.log('Body:', req.body);
//     next();
// });

// Ruta home que muestra los productos usando Handlebars
app.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).render("error", {
      statusCode: 500,
      message: "Error al cargar productos",
      error: error.message,
      stack: error.stack,
    });
  }
});

// Rutas principales de la API, endpoint /api/products y /api/carts
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
