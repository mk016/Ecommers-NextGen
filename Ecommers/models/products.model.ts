import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },

    Displayprice: {
      type: Number,
      require: true,
    },

    discription: {
      type: String,
      require: true,
    },

    Tgags: {
      type: String,
      require: true,
    },
    isHighlights: {
      type: String,
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

export const Products = mongoose.model("product", ProductsSchema);
