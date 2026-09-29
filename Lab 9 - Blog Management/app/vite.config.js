import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The React app calls relative URLs such as fetch("/api/posts").
// In development Vite forwards every /api request to the Express server,
// so no CORS setup is needed. If you change PORT in server/.env,
// change the port below as well.
const api = {
  "/api": { target: "http://localhost:5050", changeOrigin: true },
};

export default defineConfig({
  base: "./", // keep asset URLs relative; avoids a blank page if dist/index.html is opened as a file
  plugins: [react()],
  server: { port: 5173, proxy: api },
  preview: { port: 5173, proxy: api },
});
