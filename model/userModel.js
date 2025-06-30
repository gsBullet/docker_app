const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("Users", UserSchema);
