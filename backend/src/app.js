import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
const app = express();

// Middleware
app.use(cors({
    origin: "https://nexura-ai-sepia.vercel.app/",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));



// Health check
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

/**
 * Routes
 */

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

app.use("/api/chats", chatRouter);
app.use("/api/auth", authRouter);

// Error handling middleware - MUST be last
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({
        message: "Internal server error",
        success: false,
        err: err.message
    });
});

export default app;
