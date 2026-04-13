const mongoose = require("mongoose");

const foxSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fox", foxSchema);
