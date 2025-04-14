import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
