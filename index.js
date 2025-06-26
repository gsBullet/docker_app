const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express and Mongoose!");
});
// 4. Additional Middleware
app.set("json spaces", 4);
app.use(express.json());
// app.use(bodyParser.json());
// app.use(formData.parse());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL,{})
  .then((a) => {
    console.log("Connected to MongoDB",a.connection.name);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })

  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  });
