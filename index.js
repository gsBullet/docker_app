const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
const port = process.env.PORT || 6001;

const userModel = require("./model/userModel");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload()); // 👈 Add file upload middleware

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express and Mongoose!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    console.log("Users found:", users);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/upload", (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.file;
  const fileName = `upload_${Date.now()}.jpg`; // clean name
  const uploadPath = path.join(__dirname, "uploads", fileName);

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("File uploaded successfully");
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  });
