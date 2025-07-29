// Importa el módulo Express y crea un router
import express from "express";
import CartDAO from "../dao/CartDAO.js";

const router = express.Router();
const cartDAO = new CartDAO();

// POST /api/carts - Crea un nuevo carrito vacío
router.post("/", async (req, res) => {
    try {
        const newCart = await cartDAO.createCart();
        res.status(201).json({
            status: 'success',
            payload: newCart
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// GET /api/carts/:cid - Devuelve un carrito por su id con productos poblados
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid).populate('products.product');
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.render('cart', { cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /api/carts/:cid/product/:pid - Agrega un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { quantity = 1 } = req.body;
        const updatedCart = await cartDAO.addProductToCart(
            req.params.cid,
            req.params.pid,
            quantity
        );
        res.json({
            status: 'success',
            payload: updatedCart
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// PUT /api/carts/:cid - Actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        await Cart.updateOne({ _id: cid }, { $set: { products } });
        res.json({ status: 'success', message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /api/carts/:cid/products/:pid - Actualizar cantidad de un producto específico
router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await Cart.updateOne(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': quantity } }
        );
        res.json({ status: 'success', message: 'Product quantity updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/carts/:cid/products/:pid - Eliminar producto específico del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        await Cart.updateOne({ _id: cid }, { $pull: { products: { product: pid } } });
        res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/carts/:cid - Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        await Cart.updateOne({ _id: cid }, { $set: { products: [] } });
        res.json({ status: 'success', message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /api/carts/:cid/products/:pid - Agrega un producto a un carrito específico (modificado)
router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json({ status: 'success', message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Exporta el router para usarlo en la app principal
export default router;
