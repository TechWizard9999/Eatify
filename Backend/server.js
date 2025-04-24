import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/User.js"; // 💡 Import your user routes

// Load environment variables from .env file
dotenv.config();

const app = express();

// 💡 Middleware to parse incoming JSON
app.use(express.json());

// 💡 Use the routes
app.use("/api/user", userRoutes);

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }

    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected successfully!");

    app.on("error", (error) => {
      console.error("Express Error:", error);
    });

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1);
  }
})();
