const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager('./src/data/products.json');

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/products
router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json({ product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updated = await productManager.updateProduct(id, req.body);
        res.json({ product: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        await productManager.deleteProduct(id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
