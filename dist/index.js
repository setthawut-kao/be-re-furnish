import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { generalLimiter, authLimiter } from "./src/middlewares/rateLimiter.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/product.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// --- Configuration ---
dotenv.config(); // Load .env file
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  // frontend domain
  credentials: true // ✅ allow cookies to be sent
};

// --- swagger setup ---
if (process.env.NODE_ENV !== "production") {
  const swaggerDocument = YAML.load("./swagger.yaml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// --- Middlewares ---
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(cors(corsOptions));
app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); // Allow app to accept URL-encoded form data
app.use(cookieParser());

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Re:furnish API is running...");
});

// --- API Routes ---
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use(errorHandler);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});