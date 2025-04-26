import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sellerRoutes from "./routes/seller.js";
import userRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error during MongoDB connection:", error);
    process.exit(1);
  }
};

const startServer = () => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
};

const setupApp = () => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/user", userRoutes);
  app.use("/api/seller", sellerRoutes); 
};

const handleError = () => {
  app.on("error", (error) => {
    console.error("Express Error:", error);
  });
};

(async () => {
  try {
    setupApp();
    await connectDB();
    handleError();
    startServer();
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1);
  }
})();
