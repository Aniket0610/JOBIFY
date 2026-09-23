import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
    try {
        // Reuse an existing MongoDB connection
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        // Check if MongoDB URI is available
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        // Create a connection only if one is not already in progress
        if (!connectionPromise) {
            connectionPromise = mongoose.connect(
                process.env.MONGO_URI
            );
        }

        await connectionPromise;

        console.log("MongoDB connected successfully");

        return mongoose.connection;

    } catch (error) {
        connectionPromise = null;

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        throw error;
    }
};

export default connectDB;