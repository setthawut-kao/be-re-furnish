import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log a confirmation message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and exit the process
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
