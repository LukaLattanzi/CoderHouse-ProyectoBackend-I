import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        maxlength: [100, 'El título no puede exceder 100 caracteres']
    },
    description: {
        type: String,
        index: 'text',
        required: [true, 'La descripción es requerida'],
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    code: {
        type: String,
        required: [true, 'El código es requerido'],
        unique: true,
        trim: true,
        uppercase: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [true, 'El stock es requerido'],
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    },
    category: {
        type: String,
        index: true,
        required: [true, 'La categoría es requerida'],
        trim: true,
        enum: {
            values: ['Videojuego', 'Consola', 'Accesorio'],
            message: 'Categoría no válida'
        }
    },
    thumbnails: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

// Agregar plugin de paginación
productSchema.plugin(mongoosePaginate);

// Middleware para convertir code a mayúsculas antes de guardar
productSchema.pre('save', function (next) {
    if (this.code) {
        this.code = this.code.toUpperCase();
    }
    next();
});

// Método personalizado para obtener productos activos
productSchema.statics.findActive = function () {
    return this.find({ status: true });
};

// Método de instancia para verificar si hay stock suficiente
productSchema.methods.hasStock = function (quantity = 1) {
    return this.stock >= quantity;
};

const Product = mongoose.model('Product', productSchema);

export default Product;