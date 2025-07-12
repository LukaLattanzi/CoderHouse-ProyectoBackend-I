// Modulos 'fs' y 'path' para manejar archivos y rutas
import fs from "fs";
import path from "path";

class CartManager {
  // El constructor, recibe ruta del archivo donde se almacenan los carritos
  constructor(filePath) {
    this.path = path.resolve(filePath);
  }

  // Método para leer el archivo y devolver los carritos como un arreglo
  // si el archivo no existe, retorna un arreglo vacío
  async #readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  // Método para escribir el arreglo de carritos en el archivo
  async #writeFile(carts) {
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  // Función para crear un nuevo carrito vacío, asigna un id autoincrementable
  // y lo agrega al arreglo de carritos, luego lo guarda en el archivo
  async createCart() {
    const carts = await this.#readFile();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: [],
    };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  // Función para obtener un carrito por su id, busca en el arreglo de carritos
  // y devuelve el carrito encontrado o null si no existe
  async getCartById(id) {
    const carts = await this.#readFile();
    return carts.find((c) => c.id === id) || null;
  }

  // Función para agregar un producto a un carrito específico, busca el carrito por su id
  // y si el producto ya existe, incrementa su cantidad, si no, lo agrega al carrito
  // Luego guarda el carrito actualizado en el archivo
  async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.#readFile();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) throw new Error("Carrito no encontrado");
    const existingProduct = cart.products.find((p) => p.product === productId);
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
export default CartManager;
