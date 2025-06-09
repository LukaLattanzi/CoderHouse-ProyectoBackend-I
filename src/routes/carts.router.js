// Importa el módulo Express y crea un router
const express = require("express");
const router = express.Router();

// Importa el CartManager para manejar la lógica de carritos
const CartManager = require("../managers/CartManager");

// Instancia CartManager con la ruta al archivo de carritos
const cartManager = new CartManager("./src/data/carts.json");

// POST /api/carts - Crea un nuevo carrito vacío
router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart(); // Crea un nuevo carrito
    res.status(201).json({ cart: newCart }); // Responde con el carrito creado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error interno del servidor
  }
});

// GET /api/carts/:cid - Devuelve un carrito por su id
router.get("/:cid", async (req, res) => {
  try {
    const id = parseInt(req.params.cid); // Obtiene el id del parámetro de ruta
    const cart = await cartManager.getCartById(id); // Busca el carrito por id
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" }); // Si no existe, responde 404
    res.json({ cart }); // Responde con el carrito encontrado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error interno del servidor
  }
});

// POST /api/carts/:cid/product/:pid - Agrega un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid); // Obtiene el id del carrito
    const productId = parseInt(req.params.pid); // Obtiene el id del producto

    const updatedCart = await cartManager.addProductToCart(cartId, productId); // Agrega el producto al carrito
    res.json({ cart: updatedCart }); // Responde con el carrito actualizado
  } catch (error) {
    res.status(400).json({ error: error.message }); // Error si el carrito o producto no existe
  }
});

// Exporta el router para usarlo en la app principal
module.exports = router;
