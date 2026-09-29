// Loads the variables from server/.env into process.env.
// Import this file FIRST (before anything that reads process.env).
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve .env relative to this file so the server works no matter which
// folder it is started from.
dotenv.config({ path: path.join(__dirname, ".env") });
