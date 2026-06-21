import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT);

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

