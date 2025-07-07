// Importa el módulo Express y crea un router
const express = require("express");
const router = express.Router();

// Importa el ProductManager para manejar los productos
const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager("./src/data/products.json");

// Ruta home que muestra los productos usando Handlebars
router.get("/", async (req, res) => {
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

// Ruta para productos en tiempo real
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

// Ruta para el chat
router.get("/chat", (req, res) => {
  res.render("chat");
});

// Exporta el router para usarlo en la app principal
module.exports = router;
