// Importa el módulo 'fs' con promesas para manejar archivos de forma asíncrona
const fs = require("fs").promises;
// Importa el módulo 'path' para manejar rutas de archivos
const path = require("path");

class CartManager {
  // El constructor recibe la ruta del archivo donde se almacenan los carritos
  constructor(filePath) {
    this.path = path.resolve(filePath);
  }

  // Método privado para leer el archivo y devolver los carritos como un arreglo
  async #readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      // Si el archivo no existe o hay error, retorna un arreglo vacío
      return [];
    }
  }

  // Método privado para escribir el arreglo de carritos en el archivo
  async #writeFile(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  // Crea un nuevo carrito vacío y lo guarda en el archivo
  async createCart() {
    const carts = await this.#readFile();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, // id autoincrementable
      products: [], // El carrito inicia vacío
    };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  // Busca un carrito por su id
  async getCartById(id) {
    const carts = await this.#readFile();
    // Devuelve el carrito encontrado o null si no existe
    return carts.find((c) => c.id === id) || null;
  }

  // Agrega un producto a un carrito específico
  async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.#readFile();

    const cart = carts.find(c => c.id === cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await this.#writeFile(carts);
    return cart;
  }
}

// Exporta la clase para poder usarla en otros archivos
module.exports = CartManager;
