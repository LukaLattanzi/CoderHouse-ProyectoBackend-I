// Importa el módulo 'fs' con promesas para manejar archivos de forma asíncrona
const fs = require("fs").promises;
// Importa el módulo 'path' para manejar rutas de archivos
const path = require("path");

class ProductManager {
  // El constructor recibe la ruta del archivo donde se almacenan los productos
  constructor(filePath) {
    this.path = path.resolve(filePath);
  }

  // Método privado para leer el archivo y devolver los productos como un arreglo
  async #readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay error, retorna un arreglo vacío
      return [];
    }
  }

  // Método privado para escribir el arreglo de productos en el archivo
  async #writeFile(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  // Agrega un nuevo producto al archivo
  async addProduct({
    title,
    description,
    price,
    code,
    stock,
    category,
    status = true,
    thumbnails = [],
  }) {
    // Valida que todos los campos obligatorios estén presentes
    if (
      [title, description, price, code, stock, category].some(
        (field) => field === undefined
      )
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const products = await this.#readFile();

    // Valida que el código no se repita
    if (products.some((p) => p.code === code)) {
      throw new Error("El código ya existe");
    }

    // Si thumbnails no es un array, lo convierte en uno
    if (!Array.isArray(thumbnails)) {
      thumbnails = [thumbnails];
    }

    // Crea el nuevo producto con id autoincrementable y todos los campos requeridos
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      title,
      description,
      price,
      code,
      status,
      stock,
      category,
      thumbnails,
    };

    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  }

  // Devuelve todos los productos almacenados
  async getProducts() {
    return await this.#readFile();
  }

  // Busca un producto por su id
  async getProductById(id) {
    const products = await this.#readFile();
    // Devuelve el producto encontrado o null si no existe
    return products.find((p) => p.id === id) || null;
  }

  // Actualiza un producto existente por su id
  async updateProduct(id, updatedFields) {
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Producto no encontrado");

    // Actualiza solo los campos enviados, mantiene el id original
    products[index] = { ...products[index], ...updatedFields, id };
    await this.#writeFile(products);
    return products[index];
  }

  // Elimina un producto por su id
  async deleteProduct(id) {
    const products = await this.#readFile();
    const newProducts = products.filter((p) => p.id !== id);
    if (products.length === newProducts.length)
      throw new Error("Producto no encontrado");

    await this.#writeFile(newProducts);
    return true;
  }
}

// Exporta la clase para poder usarla en otros archivos
module.exports = ProductManager;
