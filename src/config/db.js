import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const connectDB = async () => {
    try {
        // Verificar que MONGO_URI esté definido
        if (!process.env.MONGO_URI) {
            throw new Error('❌ MONGO_URI no está definido en las variables de entorno');
        }

        console.log('🔄 Intentando conectar a MongoDB...');
        console.log('🔗 URI:', process.env.MONGO_URI.replace(/:([^:@]{8})[^:@]*@/, ':****@')); // Oculta la contraseña en logs

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // Aumentado a 10s para conexiones lentas
            socketTimeoutMS: 45000, // Cierra sockets después de 45s de inactividad
            heartbeatFrequencyMS: 10000, // Envía heartbeat cada 10s
            maxPoolSize: 10, // Máximo 10 conexiones en el pool
        });

        console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🔗 Estado de conexión: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);

        // Escuchar eventos de conexión
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('📤 MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

        mongoose.connection.on('connecting', () => {
            console.log('🔄 MongoDB connecting...');
        });

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('💡 Verifica:');
        console.error('   1. Que tu usuario y contraseña sean correctos en MongoDB Atlas');
        console.error('   2. Que tu IP esté en la whitelist de MongoDB Atlas');
        console.error('   3. Que el cluster esté activo');
        console.error('   4. Que la red permita conexiones a MongoDB (puerto 27017)');

        // En desarrollo, no terminar el proceso para poder seguir trabajando
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            console.log('🔄 Continuando en modo desarrollo sin MongoDB...');
        }
    }
};

export default connectDB;