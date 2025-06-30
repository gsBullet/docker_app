const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./model/userModel");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 6001;

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express and Mongoose!");
});
app.get("/users", async (req, res) => {
  await userModel
    .find()
    .then((users) => {
      console.log(`i am user`,users);
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

// 4. Additional Middleware
app.set("json spaces", 4);
app.use(express.json());
// app.use(bodyParser.json());
// app.use(formData.parse());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL , {})
  .then((a) => {
    console.log("Connected to MongoDB", a.connection.name);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
