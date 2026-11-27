


// export default app;
import express from "express";
import productroute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser"; // Middleware to parse cookies to read the token from the cookie

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.use("/api/v1", productroute);  // routes for product details
app.use("/api/v1", userRoute);  // routes for user details

// Middleware for handling errors
app.use(errorMiddleware); 

export default app;