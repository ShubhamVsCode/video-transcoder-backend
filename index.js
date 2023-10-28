import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import uploadRouter from "./routes/upload.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", uploadRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
