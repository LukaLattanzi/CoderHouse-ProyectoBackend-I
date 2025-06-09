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
        const products = await productManager.getProducts(); // Obtiene todos los productos
        res.json({ products }); // Responde con el array de productos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error interno del servidor
    }
});

// GET /api/products/:pid - Devuelve un producto por su id
router.get("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid); // Obtiene el id del parámetro de ruta
        const product = await productManager.getProductById(id); // Busca el producto por id
        if (!product)
            return res.status(404).json({ error: "Producto no encontrado" }); // Si no existe, responde 404
        res.json({ product }); // Responde con el producto encontrado
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error interno del servidor
    }
});

// POST /api/products - Agrega un nuevo producto
router.post("/", async (req, res) => {
    console.log("POST /api/products ejecutándose"); // Añade esta línea
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
        const id = parseInt(req.params.pid); // Obtiene el id del parámetro de ruta
        const updated = await productManager.updateProduct(id, req.body); // Actualiza el producto con los datos recibidos
        res.json({ product: updated }); // Responde con el producto actualizado
    } catch (error) {
        res.status(400).json({ error: error.message }); // Error de validación o datos incorrectos
    }
});

// DELETE /api/products/:pid - Elimina un producto por su id
router.delete("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid); // Obtiene el id del parámetro de ruta
        await productManager.deleteProduct(id); // Elimina el producto
        res.json({ message: "Producto eliminado" }); // Responde con mensaje de éxito
    } catch (error) {
        res.status(400).json({ error: error.message }); // Error si el producto no existe
    }
});

// Exporta el router para usarlo en la app principal
module.exports = router;
