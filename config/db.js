const mongoose = require("mongoose");

const connectDB = async (URL) => {
  try {
    if (!URL) throw new Error("MongoDB URI is not defined");
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
