// Importa el módulo Express y crea un router
import express from "express";
import Cart from '../models/Cart.js';
import mongoose from "mongoose";

const router = express.Router();

// POST /api/carts - Crea un nuevo carrito vacío
router.post("/", async (req, res) => {
    try {
        // Crear un nuevo carrito vacío
        const newCart = new Cart({ products: [] });
        await newCart.save();

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

// DELETE api/carts/:cid/products/:pid - Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        // Filtrar el producto a eliminar
        cart.products = cart.products.filter(item => item.product.toString() !== pid);

        await cart.save();
        res.json({ status: 'success', message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito', error: error.message });
    }
});

// DELETE api/carts/:cid - Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        // Vaciar el carrito
        cart.products = [];
        await cart.save();

        res.json({ status: 'success', message: 'Carrito vaciado exitosamente', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al vaciar el carrito', error: error.message });
    }
});

// GET api/carts/:cid - Obtener un carrito con productos poblados
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).render('error', {
                statusCode: 400,
                message: 'ID de carrito no válido',
            });
        }

        // Buscar el carrito y poblar los productos
        const cart = await Cart.findById(cid).populate('products.product').lean();
        if (!cart) {
            return res.status(404).render('error', {
                statusCode: 404,
                message: 'Carrito no encontrado',
            });
        }

        // Renderizar la vista del carrito
        res.render('cartDetail', { cart });
    } catch (error) {
        res.status(500).render('error', {
            statusCode: 500,
            message: 'Error al obtener el carrito',
            error: error.message,
        });
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

// POST /api/carts/:cid/products/:pid - Agregar un producto a un carrito específico
router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body; // Usar 1 como valor predeterminado si no se envía cantidad

    try {
        let cart = await Cart.findById(cid);

        // Si el carrito no existe, devolver un error
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(item => item.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity; // Incrementar la cantidad
        } else {
            cart.products.push({ product: pid, quantity }); // Agregar nuevo producto con la cantidad especificada
        }

        // Guardar el carrito actualizado
        await cart.save();

        res.status(200).json({ status: 'success', message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al agregar producto al carrito', error: error.message });
    }
});

// PUT /api/carts/:cid - Finalizar un carrito
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({ status: 'error', message: 'ID de carrito no válido' });
        }

        // Buscar el carrito
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        // Cambiar el estado del carrito a "finalizado"
        cart.status = 'inactive';
        await cart.save();

        res.json({ status: 'success', message: 'Carrito finalizado', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al finalizar el carrito', error: error.message });
    }
});

// Exporta el router para usarlo en la app principal
export default router;
