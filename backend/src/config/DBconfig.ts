import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URL;

export default async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MongoDB URI is not defined.");
        }
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("MongoDB Connection failed", error);
    }
};