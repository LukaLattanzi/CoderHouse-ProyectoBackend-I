// Importa el módulo Express y crea un router
import express from "express";
import ProductDAO from "../dao/ProductDAO.js";
import CartDAO from "../dao/CartDAO.js";

const router = express.Router();
const productDAO = new ProductDAO();
const cartDAO = new CartDAO();

// Ruta home que muestra los productos con paginación
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, category, status } = req.query;

    // Construir filtros
    let query = {};
    if (category) query.category = category;
    if (status !== undefined) query.status = status === 'true';

    // Obtener productos desde el DAO con paginación
    const products = await productDAO.getProducts({
      page,
      limit,
      sort,
      query,
    });

    // Renderizar la vista con los productos y datos de paginación
    res.render("home", {
      products: products.payload, // Lista de productos
      pagination: {
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
      },
    });
  } catch (error) {
    res.status(500).render("error", {
      statusCode: 500,
      message: "Error al cargar productos",
      error: error.message,
    });
  }
});

// Ruta para ver un producto específico
router.get("/products/:pid", async (req, res) => {
  try {
    // Obtener el producto desde el DAO
    const product = await productDAO.getProductById(req.params.pid);

    // Registrar el producto en el backend
    console.log("Producto obtenido:", product);

    // Verificar si el producto existe
    if (!product) {
      return res.status(404).render("error", {
        statusCode: 404,
        message: "Producto no encontrado"
      });
    }

    // Pasar el producto al frontend
    res.render("productDetail", { product });
  } catch (error) {
    // Manejar errores
    console.error("Error al cargar el producto:", error);
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
    console.error("Error al cargar el carrito:", error);
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
