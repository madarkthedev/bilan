import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.HOST, // Your backend server address
        changeOrigin: true,
        secure: false,
        ws:true,
      },
    },
  },
});
