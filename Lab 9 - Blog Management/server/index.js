// Express.js REST API entry point.
import "./loadEnvironment.js"; // must stay the first import
import express from "express";
import cors from "cors";
import { client } from "./db/conn.js";
import posts from "./routes/posts.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Simple health check: http://localhost:5050/api/health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Post routes
app.use("/api/posts", posts);

// Unknown /api/... route
app.use("/api", (req, res) => res.status(404).json({ error: "Route not found." }));

// Central error handler
app.use((err, req, res, next) => {
  if (err.status && err.status < 500) {
    // e.g. malformed JSON body or payload too large
    return res.status(err.status).json({ error: "The request could not be read. Check the JSON you sent." });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server. Please try again." });
});

const server = app.listen(PORT, () => {
  console.log(`[api] Server running on http://localhost:${PORT}`);
});

// Close the MongoDB connection cleanly on Ctrl+C
process.on("SIGINT", async () => {
  server.close();
  await client.close();
  process.exit(0);
});
