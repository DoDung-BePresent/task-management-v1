/**
 * Node modules
 */
import "dotenv/config";
import cors from "cors";
import express from "express";

/**
 * Middlewares
 */
import { errorHandler } from "./middlewares/errorHandler";

/**
 * Config
 */
import connectDB from "./config/connectDB";

/**
 * Routes
 */
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";

const app = express();
const BASE_PATH = process.env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

/**
 * Routes
 */
app.use(`${BASE_PATH}/auth`, authRoute);
app.use(`${BASE_PATH}/user`, userRoute)

/**
 * Error Handler
 */
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  console.log(`Server listening on port ${process.env.PORT}!`);
  await connectDB();
});
