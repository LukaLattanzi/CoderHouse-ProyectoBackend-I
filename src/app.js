// Importa el router de productos y de carritos
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

// Importa el ProductManager para manejar los productos
const ProductManager = require("./managers/ProductManager");
const productManager = new ProductManager("./src/data/products.json");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

// Crea una instancia de la aplicación Express
const app = express();

// Ahora puedes crear el servidor HTTP y socket.io
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Define el puerto donde se ejecutará el servidor
const PORT = 8080;

// Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

let messages = [];

// Configuración de WebSockets para el chat
io.on("connection", (socket) => {
  let currentUser = null;

  socket.on("registerUser", (username) => {
    currentUser = username;
    socket.emit("messageList", messages);
    console.log(`Usuario conectado: ${username}`);
  });

  socket.on("newMessage", (msg) => {
    const message = {
      user: currentUser || "Anónimo",
      text: msg.text || msg,
    };
    messages.push(message);
    io.emit("messageList", messages);
  });
});

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Ruta para el chat
app.get("/chat", (req, res) => {
  res.render("chat");
});

// Rutas principales de la API, endpoint /api/products y /api/carts
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Inicia el servidor con http.listen para soportar socket.io
http.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
