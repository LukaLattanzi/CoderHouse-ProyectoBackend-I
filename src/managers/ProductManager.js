const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = path.resolve(filePath);
    }

    async #readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeFile(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        if ([title, description, price, thumbnail, code, stock].some(field => field === undefined)) {
            throw new Error("Todos los campos son obligatorios");
        }

        const products = await this.#readFile();

        if (products.some(p => p.code === code)) {
            throw new Error("El código ya existe");
        }

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        products.push(newProduct);
        await this.#writeFile(products);
        return newProduct;
    }

    async getProducts() {
        return await this.#readFile();
    }

    async getProductById(id) {
        const products = await this.#readFile();
        return products.find(p => p.id === id) || null;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.#readFile();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) throw new Error("Producto no encontrado");

        products[index] = { ...products[index], ...updatedFields, id };
        await this.#writeFile(products);
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.#readFile();
        const newProducts = products.filter(p => p.id !== id);
        if (products.length === newProducts.length) throw new Error("Producto no encontrado");

        await this.#writeFile(newProducts);
        return true;
    }
}

module.exports = ProductManager;
