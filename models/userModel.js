const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name Required"],
    },
    last_name: {
      type: String,
      required: [true, "Last Name Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender Required"],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      minLength: [6, "Password Must be up to or greater than 6 characters"],
    },
    user_type: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);
module.exports = User;
