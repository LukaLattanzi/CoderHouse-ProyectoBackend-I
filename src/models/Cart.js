import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'La cantidad debe ser al menos 1'],
            default: 1
        }
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    totalAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

// Método para calcular el total del carrito
cartSchema.methods.calculateTotal = async function () {
    await this.populate('products.product');

    this.totalAmount = this.products.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);

    return this.totalAmount;
};

// Método para agregar producto al carrito
cartSchema.methods.addProduct = function (productId, quantity = 1) {
    const existingProduct = this.products.find(item =>
        item.product.toString() === productId.toString()
    );

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        this.products.push({ product: productId, quantity });
    }
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;