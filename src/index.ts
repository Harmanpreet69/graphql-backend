import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./schema";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "";

const app = express();
const graphqlHandler = createHandler({ schema });

// Connect to MongoDB database
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB database successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB database:", err.message);
  });

app.use(express.json());

// Enables request from all origins, not recommended for production
app.use(cors());

// Enable GraphQL endpoints on "/graphql"
app.all("/graphql", graphqlHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
