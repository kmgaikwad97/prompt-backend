const express = require("express");
var cors = require("cors");
const PORT = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require("./config/database");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/",(req,res)=>{
  res.send("Hello Prompt App")
})

const userRouter = require("../src/routes/user");

app.use(express.json());

app.use("/api/v1/", userRouter);

connectDb()
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`connected to the ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message, "error in db connection");
  });