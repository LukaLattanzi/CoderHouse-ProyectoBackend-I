// Importa el módulo Express y crea un router
import express from "express";
import ProductDAO from "../dao/ProductDAO.js";
import CartDAO from "../dao/CartDAO.js";
import Product from '../models/Product.js'; // Asegúrate de importar el modelo

const router = express.Router();
const productDAO = new ProductDAO();
const cartDAO = new CartDAO();

// Ruta home que muestra los productos con paginación
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, category, status } = req.query;

        // Construir filtros
        let mongoQuery = {};
        if (category) mongoQuery.category = category;
        if (status !== undefined) mongoQuery.status = status === 'true';

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort,
            query: mongoQuery
        };

        const result = await productDAO.getProducts(options);

        if (result.status === 'error') {
            return res.status(500).render("error", {
                statusCode: 500,
                message: "Error al cargar productos",
                error: result.message
            });
        }

        const products = await Product.find().lean(); // Obtén los productos desde MongoDB
        res.render("home", {
            products: result.payload,
            pagination: {
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevLink,
                nextLink: result.nextLink
            },
            filters: { category, status, sort }
        });
    } catch (error) {
        res.status(500).render("error", {
            statusCode: 500,
            message: "Error al cargar productos",
            error: error.message,
            stack: error.stack,
        });
    }
});

// Ruta para ver un producto específico
router.get("/products/:pid", async (req, res) => {
    try {
        const product = await productDAO.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).render("error", {
                statusCode: 404,
                message: "Producto no encontrado"
            });
        }
        res.render("productDetail", { product });
    } catch (error) {
        res.status(500).render("error", {
            statusCode: 500,
            message: "Error al cargar el producto",
            error: error.message
        });
    }
});

// Ruta para ver un carrito específico
router.get("/carts/:cid", async (req, res) => {
    try {
        const cart = await cartDAO.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).render("error", {
                statusCode: 404,
                message: "Carrito no encontrado"
            });
        }
        res.render("cartDetail", { cart });
    } catch (error) {
        res.status(500).render("error", {
            statusCode: 500,
            message: "Error al cargar el carrito",
            error: error.message
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
export default router;
