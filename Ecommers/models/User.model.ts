import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password hash is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
