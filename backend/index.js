import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";
import addressRoutes from "./routes/address.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const __dirname = path.resolve();

app.use(cors({ 
  origin: process.env.NODE_ENV === "production" 
    ? ["https://your-frontend-project-name.vercel.app", "https://your-frontend-project-name-git-main.vercel.app"]
    : "http://localhost:4200", 
  credentials: true 
}));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);

// Remove static file serving for Vercel deployment
// Vercel handles static files separately

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "API is working" });
});

app.listen(PORT, () => {
	console.log("Server is running on port: ", PORT);
	connectDB();
});
