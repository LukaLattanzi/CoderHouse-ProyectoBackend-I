// Importa el módulo Express y crea un router
import express from "express";
import ProductDAO from "../dao/ProductDAO.js";

const router = express.Router();
const productDAO = new ProductDAO();

// Variable para almacenar la instancia de socket.io
let io;

// GET /api/products - Devuelve productos con paginación y filtros
router.get("/", async (req, res) => {
    const { limit = 10, page = 1, sort, category, status } = req.query;

    // Construir filtros
    const filter = {};
    if (category) filter.category = category;
    if (status !== undefined) filter.status = status === 'true';

    // Configurar ordenamiento
    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sortOption,
    };

    try {
        const products = await Product.paginate(filter, options);

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&category=${category}&status=${status}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&category=${category}&status=${status}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /api/products/:pid - Devuelve un producto por su id
router.get("/:pid", async (req, res) => {
    try {
        const product = await productDAO.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: "Producto no encontrado"
            });
        }
        res.json({
            status: 'success',
            payload: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// POST /api/products - Agrega un nuevo producto
router.post("/", async (req, res) => {
    try {
        const newProduct = await productDAO.createProduct(req.body);

        // Emitir actualización via WebSocket si está disponible
        if (io) {
            const products = await productDAO.getProducts();
            io.emit("updateProducts", products.payload);
        }

        res.status(201).json({
            status: 'success',
            payload: newProduct
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// PUT /api/products/:pid - Actualiza un producto existente
router.put("/:pid", async (req, res) => {
    try {
        const updated = await productDAO.updateProduct(req.params.pid, req.body);
        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: "Producto no encontrado"
            });
        }
        res.json({
            status: 'success',
            payload: updated
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// DELETE /api/products/:pid - Elimina un producto por su id
router.delete("/:pid", async (req, res) => {
    try {
        const deleted = await productDAO.deleteProduct(req.params.pid);
        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: "Producto no encontrado"
            });
        }

        // Emitir actualización via WebSocket si está disponible
        if (io) {
            const products = await productDAO.getProducts();
            io.emit("updateProducts", products.payload);
        }

        res.json({
            status: 'success',
            message: "Producto eliminado"
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Función para configurar socket.io en este router
function configureSocket(socketInstance) {
    io = socketInstance;
}

// Exporta el router y la función de configuración
export default router;
export { configureSocket };
