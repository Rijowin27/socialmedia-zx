const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  image: String,
  timestamp: Date,
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
});

module.exports = mongoose.model("Post", postSchema);
