// Dependencies
const express = require("express");
const path = require("path");

// App settings
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// DB Configuration
const connectDB = require("./config/db");
connectDB(process.env.MONGODB_URL);

// Import controllers
const foxRouter = require("./router/foxRouter");

// Routes
app.use(foxRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
