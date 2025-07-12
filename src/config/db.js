import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Las opciones useNewUrlParser, useUnifiedTopology, useCreateIndex son deprecated
        // En versiones nuevas de Mongoose ya no son necesarias
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
