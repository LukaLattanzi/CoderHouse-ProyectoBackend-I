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
        const newCart = await cartManager.createCart();
        res.status(201).json({ cart: newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/carts/:cid - Devuelve un carrito por su id
router.get("/:cid", async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(id);
        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
        res.json({ cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/carts/:cid/product/:pid - Agrega un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const { quantity } = req.body;

        const amount = quantity && quantity > 0 ? quantity : 1;

        const updatedCart = await cartManager.addProductToCart(cartId, productId, amount);
        res.json({ cart: updatedCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Exporta el router para usarlo en la app principal
module.exports = router;
