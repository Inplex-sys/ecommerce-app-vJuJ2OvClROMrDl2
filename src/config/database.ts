import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
	try {
		const mongoURI = process.env.MONGODB_URI;

		if (!mongoURI) {
			throw new Error(
				"MongoDB URI is not defined in environment variables"
			);
		}

		await mongoose.connect(mongoURI);
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
