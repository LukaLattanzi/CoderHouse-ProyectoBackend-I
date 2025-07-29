import Cart from '../models/Cart.js';

export default class CartDAO {
    async createCart() {
        const cart = new Cart();
        return await cart.save();
    }

    async getCartById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async updateCart(id, products) {
        return await Cart.findByIdAndUpdate(
            id,
            { products },
            { new: true }
        ).populate('products.product');
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.addProduct(productId, quantity);
        await cart.save();
        return await Cart.findById(cartId).populate('products.product');
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const productIndex = cart.products.findIndex(
            item => item.product.toString() === productId
        );

        if (productIndex === -1) {
            throw new Error('Producto no encontrado en el carrito');
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return await Cart.findById(cartId).populate('products.product');
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        return await Cart.findById(cartId).populate('products.product');
    }

    async clearCart(cartId) {
        return await Cart.findByIdAndUpdate(
            cartId,
            { products: [] },
            { new: true }
        );
    }
}