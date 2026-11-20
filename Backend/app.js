


// export default app;
import express from "express";
import productroute from "./routes/productRoute.js";

const app = express();

// routes
app.use("/api/v1", productroute);

export default app;