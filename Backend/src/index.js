import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongo from "./config/db.js";
import { ensureProductCollection } from "./qdrant/productsCollection.js";
import { syncProductsToQdrant } from "./qdrant/productSync.js";

import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import session from 'express-session';

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:8080', // 👈 set to your frontend's origin
  credentials: true // 👈 allow credentials (cookies, auth headers, etc.)
}));

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use(express.json());
app.use(cookieParser());

async function init() {
  try {
    await connectMongo(); // ⏳ Wait until connected

    await ensureProductCollection(); // ✅ Safe to call after DB connect
    await syncProductsToQdrant(); // ✅ Now your DB is connected

    // Public routes
    app.use("/api/auth", authRoutes);

    // Protected routes
    app.use("/api/transactions", transactionRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/chat", chatRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

init();
