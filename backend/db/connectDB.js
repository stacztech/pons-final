import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
	if (isConnected) {
		console.log('Using existing database connection');
		return;
	}

	try {
		console.log('Connecting to MongoDB...');
		console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
		
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 30000, // 30 seconds
			socketTimeoutMS: 45000, // 45 seconds
			maxPoolSize: 1, // Reduce pool size for serverless
			minPoolSize: 0, // Allow 0 connections when idle
			maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
			serverApi: {
				version: '1',
				strict: true,
				deprecationErrors: true,
			},
			// Additional options for better connection handling
			connectTimeoutMS: 30000,
			heartbeatFrequencyMS: 10000,
		});
		
		isConnected = true;
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
		isConnected = false;
		// Don't exit process in serverless environment
		// process.exit(1);
		throw error;
	}
};
