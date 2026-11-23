import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config({ path: "./Backend/config/config.env" });

const PORT = process.env.PORT || 5000;


// let handling the uncatch exception
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");

    process.exit(1);
});

// server start function
const startServer = async () => {
  await connectDB();

   // console.log(name);  For checking uncatched error handling

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// unhandled Rejection handler
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  
  startServer.close(() => {
    process.exit(1);
  })
});



startServer();