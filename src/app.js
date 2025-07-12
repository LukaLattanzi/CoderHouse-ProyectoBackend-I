// Configuración de variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Importar conexión a MongoDB
import connectDB from './config/db.js';

// Importa el router de productos, carritos y vistas
import productsRouter, { configureSocket } from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

// Importa el ProductManager para manejar los productos en websockets
import ProductManager from "./managers/ProductManager.js";
const productManager = new ProductManager("./src/data/products.json");

import express from "express";
import path from "path";
import exphbs from "express-handlebars";
import { fileURLToPath } from 'url';

// Para obtener __dirname en ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a MongoDB
connectDB();

// Crea una instancia de la aplicación Express
const app = express();

// Ahora puedes crear el servidor HTTP y socket.io
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer);

// Define el puerto donde se ejecutará el servidor
const PORT = process.env.PORT || 8080;

// Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

let messages = [];

// Configuración de WebSockets
io.on("connection", (socket) => {
  let currentUser = null;

  // ***** CHAT WEBSOCKETS *****
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

  // ***** PRODUCTOS WEBSOCKETS *****

  // Enviar lista de productos cuando se solicite
  socket.on("getProducts", async () => {
    try {
      const products = await productManager.getProducts();
      socket.emit("updateProducts", products);
    } catch (error) {
      socket.emit("error", "Error al cargar productos");
    }
  });

  // Agregar producto via websocket
  socket.on("addProduct", async (productData) => {
    try {
      const newProduct = await productManager.addProduct(productData);
      const products = await productManager.getProducts();

      // Emitir a todos los clientes conectados
      io.emit("updateProducts", products);
      socket.emit("productAdded", `Producto "${newProduct.title}" agregado exitosamente`);

      console.log("Producto agregado via WebSocket:", newProduct);
    } catch (error) {
      socket.emit("error", error.message);
      console.log("Error al agregar producto via WebSocket:", error.message);
    }
  });

  // Eliminar producto via websocket
  socket.on("deleteProduct", async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const products = await productManager.getProducts();

      // Emitir a todos los clientes conectados
      io.emit("updateProducts", products);
      socket.emit("productDeleted", `Producto eliminado exitosamente`);

      console.log("Producto eliminado via WebSocket:", productId);
    } catch (error) {
      socket.emit("error", error.message);
      console.log("Error al eliminar producto via WebSocket:", error.message);
    }
  });
});

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales de las vistas
app.use("/", viewsRouter);

// Rutas principales de la API, endpoint /api/products y /api/carts
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Configurar socket.io en el router de productos para conectar HTTP con WebSockets
configureSocket(io);

// Inicia el servidor con httpServer.listen para soportar socket.io
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`🔗 Productos en tiempo real: http://localhost:${PORT}/realtimeproducts`);
  console.log(`💬 Chat: http://localhost:${PORT}/chat`);
});
