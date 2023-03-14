// Configuration import
require("dotenv").config();
require("./config/db");

// default Library Import
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// created file import
const { handleError } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

// use Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// user Routes
app.use("/api/user", userRoutes);

// error handler use
app.use(handleError);

// create server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
