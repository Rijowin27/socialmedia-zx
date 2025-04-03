require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/demo")
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🔹 User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },
});

const User = mongoose.model("User", UserSchema);

// 🔹 Post Schema
const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  image: { type: String, default: null },
  likes: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);

// 🔹 Register API
app.post("/api/register", async (req, res) => {
  try {
    let { name, username, password, avatar, bio } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    username = username.trim().toLowerCase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, password: hashedPassword, avatar, bio });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Login API
app.post("/api/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    console.log("🔹 Received login request:", { username, password });

    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    username = username.trim().toLowerCase();
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Get All Posts API
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name avatar");
    res.json(posts);
  } catch (err) {
    console.error("❌ Fetch Posts Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Create Post API
app.post("/api/posts", async (req, res) => {
  try {
    const { userId, content, image } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ error: "User ID and content are required" });
    }

    const newPost = new Post({ userId, content, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("❌ Create Post Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
