import express from "express";
import dotenv from "dotenv";

import cors from "cors";



// Import routes
import authRoute from "./routers/authRoutes.mjs";


// Load environment variables from .env file
dotenv.config();


// Connect to MongoDB using Mongoose


const app = express();
const PORT = process.env.PORT || 5000;
cors(app);
// CORS options
const corsOptions = {
  origin: "*",
  methods: "GET, POST, DELETE, PUT, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Static file serving



// API routes
app.use("/api/auth", authRoute);





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
