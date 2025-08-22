import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import morgan from "morgan";
import AuthRouter from "./src/routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("server connected successfully");
  res.status(200).json({ message: "Server Connected and Working Properly" });
});

app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const StatusCode = err.StatusCode || 500;
  res.status(StatusCode).json({ message: errorMessage });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});