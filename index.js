const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./src/config/database"); 
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())
// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(express.json());

// User Routes
const userRouter = require("./src/routes/routes");
app.use("/api/v1/", userRouter);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Hello Prompt App");
});

// Database Connection and Server Startup
connectDb()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error in DB connection:", err.message);
    process.exit(1); 
  });