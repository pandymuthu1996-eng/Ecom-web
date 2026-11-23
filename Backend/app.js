


// export default app;
import express from "express";
import productroute from "./routes/productRoute.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// routes
app.use("/api/v1", productroute);

// Middleware for handling errors
app.use(errorMiddleware); 

export default app;