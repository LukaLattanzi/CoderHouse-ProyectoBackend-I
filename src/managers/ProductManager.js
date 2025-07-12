// Modulos 'fs' y 'path' para manejar archivos y rutas
import fs from "fs";
import path from "path";

class ProductManager {
    // El constructor, recibe ruta del archivo donde se almacenan los productos
    constructor(filePath) {
        this.path = path.resolve(filePath);
    }

    // Método para leer el archivo y devolver los productos como un arreglo
    // si el archivo no existe o hay error, retorna un arreglo vacío
    async #readFile() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    // Método para escribir el arreglo de productos en el archivo
    async #writeFile(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    // Función para agregar un nuevo producto, asigna un id autoincrementable
    // y lo agrega al arreglo de productos, luego lo guarda en el archivo
    async addProduct(productData) {
        const {
            title,
            description,
            price,
            code,
            stock,
            category,
            status = true,
            thumbnails = [],
        } = productData;
        if (
            !title ||
            !description ||
            price === undefined ||
            !code ||
            stock === undefined ||
            !category
        ) {
            throw new Error("Todos los campos son obligatorios");
        }
        const products = await this.#readFile();
        if (products.some((p) => p.code === code)) {
            throw new Error("El código ya existe");
        }
        if (!Array.isArray(thumbnails)) {
            thumbnails = [thumbnails];
        }
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

    // Función para obtener todos los productos
    async getProducts() {
        return await this.#readFile();
    }

    // Función para obtener un producto por su id, busca en el arreglo de productos
    // y devuelve el producto encontrado o null si no existe
    async getProductById(id) {
        const products = await this.#readFile();
        return products.find((p) => p.id === id) || null;
    }

    // Función para actualizar un producto por su id, recibe un objeto con los campos a actualizar
    // y mantiene el id original, si el producto no existe lanza un error
    async updateProduct(id, updatedFields) {
        const products = await this.#readFile();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) throw new Error("Producto no encontrado");
        products[index] = { ...products[index], ...updatedFields, id };
        await this.#writeFile(products);
        return products[index];
    }

    // Función para eliminar un producto por su id, busca en el arreglo de productos
    // y si lo encuentra, lo elimina y guarda el arreglo actualizado en el archivo
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
export default ProductManager;
