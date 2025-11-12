import mongoose from "mongoose";

const CategoireSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Categoire = mongoose.model("Categoire", CategoireSchema);
