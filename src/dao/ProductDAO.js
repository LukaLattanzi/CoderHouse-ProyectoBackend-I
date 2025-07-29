import Product from '../models/Product.js';

export default class ProductDAO {
    async getProducts(options = {}) {
        try {
            const {
                limit = 10,
                page = 1,
                sort,
                query = {}
            } = options;

            // Configurar ordenamiento
            let sortOption = {};
            if (sort) {
                sortOption.price = sort === 'asc' ? 1 : -1;
            }

            // Opciones de paginación
            const paginationOptions = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sortOption,
                lean: true
            };

            const result = await Product.paginate(query, paginationOptions);

            return {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}` : null,
                nextLink: result.hasNextPage ? `?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}` : null
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async updateProduct(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}