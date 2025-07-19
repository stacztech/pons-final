import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		// console.log("mongo_uri: ", process.env.MONGO_URI);
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 15000, // 15 seconds
			socketTimeoutMS: 45000, // 45 seconds
			bufferCommands: false, // Disable mongoose buffering
			bufferMaxEntries: 0, // Disable mongoose buffering
			maxPoolSize: 10, // Maintain up to 10 socket connections
			serverApi: {
				version: '1',
				strict: true,
				deprecationErrors: true,
			}
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};
