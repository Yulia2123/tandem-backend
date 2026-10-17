import express from "express";
import dns from "node:dns";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/usersRouter.js";
import storiesRouter from "./routes/storiesRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/categories", categoriesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
