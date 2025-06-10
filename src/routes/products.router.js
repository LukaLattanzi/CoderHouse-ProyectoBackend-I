// Importa el módulo Express y crea un router
const express = require("express");
const router = express.Router();

// Importa el ProductManager para manejar la lógica de productos
const ProductManager = require("../managers/ProductManager");

// Instancia ProductManager con la ruta al archivo de productos
const productManager = new ProductManager("./src/data/products.json");

// GET /api/products - Devuelve todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/products/:pid - Devuelve un producto por su id
router.get("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);
        if (!product)
            return res.status(404).json({ error: "Producto no encontrado" });
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/products - Agrega un nuevo producto
router.post("/", async (req, res) => {
    console.log("POST /api/products ejecutándose");
    console.log("Body recibido:", req.body);
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json({ product: newProduct });
    } catch (error) {
        console.log("Error en POST:", error.message);
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/products/:pid - Actualiza un producto existente
router.put("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updated = await productManager.updateProduct(id, req.body);
        res.json({ product: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/products/:pid - Elimina un producto por su id
router.delete("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        await productManager.deleteProduct(id);
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Exporta el router para usarlo en la app principal
module.exports = router;
