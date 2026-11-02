import dotenv from "dotenv";
dotenv.config(); // Loads variables from .env
const PORT = process.env.PORT || 5000;
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";

import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(postsRoutes);
app.use(userRoutes);

const start = async() => {
    try {
        // Reads the URI securely from your environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

start();