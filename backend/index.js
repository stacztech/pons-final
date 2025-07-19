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

// CORS configuration for both development and production
const allowedOrigins = [
  'http://localhost:4200', // Development
  'https://pons-final-frontend.vercel.app' // Production frontend
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

// Middleware to ensure database is connected before API routes
const ensureDBConnected = async (req, res, next) => {
	if (!dbConnected) {
		try {
			await initializeDB();
		} catch (error) {
			return res.status(500).json({ 
				success: false, 
				message: 'Database not available',
				error: error.message 
			});
		}
	}
	next();
};

app.use("/api/auth", ensureDBConnected, authRoutes);
app.use("/api/orders", ensureDBConnected, orderRoutes);
app.use("/api/addresses", ensureDBConnected, addressRoutes);
app.use("/api/cart", ensureDBConnected, cartRoutes);

// Remove frontend serving since we have separate deployments
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "API is working" });
});

// Test database connection
app.get("/test-db", async (req, res) => {
    try {
        const mongoose = await import('mongoose');
        const status = mongoose.connection.readyState;
        const statusText = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };
        res.json({ 
            success: true, 
            dbStatus: statusText[status],
            message: 'Database connection test',
            mongoUri: process.env.MONGO_URI ? 'Set' : 'Not set'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            mongoUri: process.env.MONGO_URI ? 'Set' : 'Not set'
        });
    }
});

// Database connection state
let dbConnected = false;

// Initialize database connection
const initializeDB = async () => {
	try {
		await connectDB();
		dbConnected = true;
		console.log('Database connection established and ready');
	} catch (error) {
		console.error('Database connection failed:', error);
		dbConnected = false;
	}
};

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
	app.listen(PORT, () => {
		console.log("Server is running on port: ", PORT);
		initializeDB();
	});
} else {
	// For production (Vercel), ensure DB is connected before any request
	app.use(async (req, res, next) => {
		try {
			if (!dbConnected) {
				await initializeDB();
			}
			next();
		} catch (error) {
			console.error('Database connection failed:', error);
			res.status(500).json({ 
				success: false, 
				message: 'Database connection failed',
				error: error.message 
			});
		}
	});
}

// Export for Vercel
export default app;
