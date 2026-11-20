


// export default app;
import express from "express";
import productroute from "./routes/productRoute.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
// routes
app.use("/api/v1", productroute);

export default app;