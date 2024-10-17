const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./src/config/database"); // Moved to the top for clarity

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure this variable is set in your .env file
    credentials: true,
  })
);

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
    process.exit(1); // Optional: Exit the process on database connection failure
  });