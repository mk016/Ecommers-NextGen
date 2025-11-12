import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.model("Banner", BannerSchema);
